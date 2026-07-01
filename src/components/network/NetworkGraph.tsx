"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  select,
  drag as d3drag,
  zoom as d3zoom,
  zoomIdentity,
  scaleSqrt,
  type Simulation,
} from "d3";
import { buildNetwork, type NetworkNode, type NetworkLink } from "@/lib/data";
import { useLang } from "../LangProvider";

const W = 900;
const H = 620;
const STUDENT_COLOR = "#2f9e6b";
const MENTOR_COLOR = "#f0523d";
const LINK_COLOR = "#c9ccd6";

type SimNode = NetworkNode & { x?: number; y?: number; fx?: number | null; fy?: number | null };
type SimLink = { source: SimNode | string; target: SimNode | string };

const idOf = (x: SimNode | string) => (typeof x === "string" ? x : x.id);

export function NetworkGraph({ year, resetToken }: { year: number | null; resetToken: number }) {
  const { t } = useLang();
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; title: string; sub: string } | null>(null);

  const data = useMemo(() => buildNetwork(year), [year]);

  useEffect(() => {
    const svgEl = svgRef.current;
    const gEl = gRef.current;
    if (!svgEl || !gEl) return;

    const nodes: SimNode[] = data.nodes.map((d) => ({ ...d }));
    const links: SimLink[] = data.links.map((d) => ({ ...d }));

    const maxDeg = Math.max(2, ...data.nodes.filter((n) => n.kind === "mentor").map((n) => n.degree));
    const rScale = scaleSqrt().domain([1, maxDeg]).range([7, 26]);
    const radius = (n: SimNode) => (n.kind === "mentor" ? rScale(n.degree) : 5);

    const g = select(gEl);
    g.attr("transform", null);
    g.selectAll("*").remove();

    const linkSel = g
      .append("g")
      .attr("stroke", LINK_COLOR)
      .attr("stroke-opacity", 0.55)
      .selectAll<SVGLineElement, SimLink>("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const nodeSel = g
      .append("g")
      .selectAll<SVGCircleElement, SimNode>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", radius)
      .attr("fill", (d) => (d.kind === "mentor" ? MENTOR_COLOR : STUDENT_COLOR))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .style("cursor", "grab");

    // adjacency for hover highlighting
    const adj = new Map<string, Set<string>>();
    nodes.forEach((n) => adj.set(n.id, new Set([n.id])));
    data.links.forEach((l) => {
      adj.get(l.source)?.add(l.target);
      adj.get(l.target)?.add(l.source);
    });

    function highlight(n: SimNode | null) {
      if (!n) {
        nodeSel.attr("opacity", 1);
        linkSel.attr("stroke-opacity", 0.55).attr("stroke", LINK_COLOR);
        return;
      }
      const nb = adj.get(n.id)!;
      nodeSel.attr("opacity", (d) => (nb.has(d.id) ? 1 : 0.12));
      linkSel
        .attr("stroke-opacity", (l) => (idOf(l.source) === n.id || idOf(l.target) === n.id ? 0.95 : 0.04))
        .attr("stroke", (l) => (idOf(l.source) === n.id || idOf(l.target) === n.id ? MENTOR_COLOR : LINK_COLOR));
    }

    nodeSel
      .on("mouseenter", (ev: MouseEvent, d) => {
        highlight(d);
        const rect = svgEl.getBoundingClientRect();
        setTip({
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
          title: d.name,
          sub:
            d.kind === "mentor"
              ? t.red.tipMentor(d.pais || "", d.degree)
              : t.red.tipStudent(d.estado || ""),
        });
      })
      .on("mousemove", (ev: MouseEvent) => {
        const rect = svgEl.getBoundingClientRect();
        setTip((p) => (p ? { ...p, x: ev.clientX - rect.left, y: ev.clientY - rect.top } : p));
      })
      .on("mouseleave", () => {
        highlight(null);
        setTip(null);
      });

    const sim: Simulation<SimNode, undefined> = forceSimulation(nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((l) => 26 + radius(l.source as SimNode) + radius(l.target as SimNode))
          .strength(0.45)
      )
      .force("charge", forceManyBody().strength(-90))
      .force("center", forceCenter(W / 2, H / 2))
      .force("collide", forceCollide<SimNode>().radius((d) => radius(d) + 2))
      .force("x", forceX(W / 2).strength(0.05))
      .force("y", forceY(H / 2).strength(0.05));

    sim.on("tick", () => {
      linkSel
        .attr("x1", (d) => (d.source as SimNode).x!)
        .attr("y1", (d) => (d.source as SimNode).y!)
        .attr("x2", (d) => (d.target as SimNode).x!)
        .attr("y2", (d) => (d.target as SimNode).y!);
      nodeSel.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    });

    const dragB = d3drag<SVGCircleElement, SimNode>()
      .on("start", (ev, d) => {
        if (!ev.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (ev, d) => {
        d.fx = ev.x;
        d.fy = ev.y;
      })
      .on("end", (ev, d) => {
        if (!ev.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    nodeSel.call(dragB);

    const zoomB = d3zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 4])
      .on("zoom", (ev) => g.attr("transform", ev.transform.toString()));
    const svgSel = select(svgEl);
    svgSel.call(zoomB).call(zoomB.transform, zoomIdentity);

    return () => {
      sim.stop();
      svgSel.on(".zoom", null);
    };
  }, [data, t, resetToken]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none rounded-2xl bg-brand-cream/50"
        role="img"
        aria-label={t.red.title}
      >
        <g ref={gRef} />
      </svg>

      {tip && (
        <div
          className="pointer-events-none absolute z-20 max-w-[240px] rounded-lg bg-brand-navy px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: tip.x + 12, top: tip.y - 10 }}
        >
          <p className="font-bold">{tip.title}</p>
          <p className="text-white/70">{tip.sub}</p>
        </div>
      )}
    </div>
  );
}
