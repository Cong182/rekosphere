import React, { useEffect } from "react";
import * as d3 from "d3";
import { mockData, Contact } from "../data/mockData";

// Interface defining a ContactNode with optional fields for D3 simulation
interface ContactNode extends d3.SimulationNodeDatum {
  id: number;
  name?: string;
  familiarityLevel?: "A" | "B" | "C" | "D";
  title?: string;
  imgUrl?: string;
  label?: string;
}

// Interface defining a Link with source and target properties
interface Link {
  source: number;
  target: number;
}

// Type defining familiarity levels
type FamiliarityLevel = "A" | "B" | "C" | "D";

// Interface defining radii properties including color
interface Radii {
  min: number;
  max: number;
  color: string;
  backgroundColor: string;
  border: string;
}

const ContactGraph: React.FC = () => {
  useEffect(() => {
    // Select the SVG container and set its width, height, and center it
    const svg = d3.select("#contact-graph");
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;
    svg
      .attr("width", width)
      .attr("height", height)
      .style("display", "block")
      .style("margin", "auto");

    // Define radii for different familiarity levels with colors
    const radii: Record<FamiliarityLevel, Radii> = {
      A: {
        min: 30,
        max: 80,
        color: "darkblue",
        backgroundColor: "#81a8c2",
        border: "10px",
      },
      B: {
        min: 90,
        max: 150,
        color: "blue",
        backgroundColor: "#97c4e2",
        border: "10px",
      },
      C: {
        min: 160,
        max: 270,
        color: "lightblue",
        backgroundColor: "#cae7fb",
        border: "10px",
      },
      D: {
        min: 280,
        max: 360,
        color: "skyblue",
        backgroundColor: "#def2ff",
        border: "10px",
      },
    };

    // Function to get the position of nodes based on their level and index
    const getPosition = (level: FamiliarityLevel, index: number) => {
      const radius = (radii[level].min + radii[level].max) / 2;
      const angle =
        (index /
          mockData.filter((d: Contact) => d.familiarityLevel === level)
            .length) *
        2 *
        Math.PI;
      return {
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle),
      };
    };

    // Create an array of nodes including a central user node
    const nodes: ContactNode[] = [
      {
        id: 0,
        label: "User",
        imgUrl: "/profile.png",
        x: width / 2,
        y: height / 2,
      },
    ];
    let levelCounters: { [key in FamiliarityLevel]: number } = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };

    // Add contacts to the nodes array with their respective positions
    mockData.forEach((contact: Contact) => {
      const { x, y } = getPosition(
        contact.familiarityLevel as FamiliarityLevel,
        levelCounters[contact.familiarityLevel as FamiliarityLevel]
      );
      levelCounters[contact.familiarityLevel as FamiliarityLevel]++;
      nodes.push({ ...contact, x, y });
    });

    // Create an array of links based on contact connections
    const links: Link[] = [];
    mockData.forEach((contact) => {
      if (contact.connections) {
        contact.connections.forEach((connectionId) => {
          links.push({ source: contact.id, target: connectionId });
        });
      }
    });

    // Add background circles for each familiarity level
    (Object.keys(radii) as FamiliarityLevel[]).forEach(
      (level: FamiliarityLevel) => {
        svg
          .append("circle")
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .attr("r", (radii[level].min + radii[level].max) / 2)
          .attr("fill", radii[level].backgroundColor)
          .attr("opacity", 0.2)
          .lower();
      }
    );

    // Function to keep node within its respective zone
    const keepNodeInZone = (node: ContactNode) => {
      const level = node.familiarityLevel as FamiliarityLevel;
      const angle = Math.atan2(node.y! - height / 2, node.x! - width / 2);
      const distanceFromCenter = Math.sqrt(
        Math.pow(node.x! - width / 2, 2) + Math.pow(node.y! - height / 2, 2)
      );

      if (distanceFromCenter > radii[level].max) {
        node.x = width / 2 + radii[level].max * Math.cos(angle);
        node.y = height / 2 + radii[level].max * Math.sin(angle);
      } else if (distanceFromCenter < radii[level].min) {
        node.x = width / 2 + radii[level].min * Math.cos(angle);
        node.y = height / 2 + radii[level].min * Math.sin(angle);
      }
    };

    // Define drag behavior functions for circle elements
    const dragCircle = d3
      .drag<SVGCircleElement, ContactNode>()
      .on("start", (event, d) => {
        d3.select(event.sourceEvent.target).raise().classed("active", true);
      })
      .on("drag", (event, d) => {
        d.x = event.x;
        d.y = event.y;
        keepNodeInZone(d); // Keep node within its zone
        d3.select(event.sourceEvent.target).attr("cx", d.x!).attr("cy", d.y!);
        updateLinkAndLabelPositions(d);
      })
      .on("end", (event, d) => {
        d3.select(event.sourceEvent.target).classed("active", false);
      });

    // Define drag behavior functions for image elements
    const dragImage = d3
      .drag<SVGImageElement, ContactNode>()
      .on("start", (event, d) => {
        d3.select(event.sourceEvent.target).raise().classed("active", true);
      })
      .on("drag", (event, d) => {
        d.x = event.x;
        d.y = event.y;
        keepNodeInZone(d); // Keep node within its zone
        d3.select(event.sourceEvent.target)
          .attr("x", d.x! - 20)
          .attr("y", d.y! - 20);
        updateLinkAndLabelPositions(d);
      })
      .on("end", (event, d) => {
        d3.select(event.sourceEvent.target).classed("active", false);
      });

    // Update link and label positions when a node is dragged
    const updateLinkAndLabelPositions = (d: ContactNode) => {
      svg
        .selectAll<SVGLineElement, Link>(".link")
        .attr("x1", (link: Link) =>
          link.source === d.id
            ? d.x!
            : nodes.find((n) => n.id === link.source)!.x!
        )
        .attr("y1", (link: Link) =>
          link.source === d.id
            ? d.y!
            : nodes.find((n) => n.id === link.source)!.y!
        )
        .attr("x2", (link: Link) =>
          link.target === d.id
            ? d.x!
            : nodes.find((n) => n.id === link.target)!.x!
        )
        .attr("y2", (link: Link) =>
          link.target === d.id
            ? d.y!
            : nodes.find((n) => n.id === link.target)!.y!
        );
      svg
        .selectAll<SVGTextElement, ContactNode>(".label")
        .attr("x", (node: ContactNode) =>
          node.id === d.id ? d.x! : nodes.find((n) => n.id === node.id)!.x!
        )
        .attr("y", (node: ContactNode) =>
          node.id === d.id
            ? d.y! + 35
            : nodes.find((n) => n.id === node.id)!.y! + 35
        );
      svg
        .selectAll<SVGImageElement, ContactNode>("image")
        .attr("x", (node: ContactNode) =>
          node.id === d.id
            ? d.x! - 20
            : nodes.find((n) => n.id === node.id)!.x! - 20
        )
        .attr("y", (node: ContactNode) =>
          node.id === d.id
            ? d.y! - 20
            : nodes.find((n) => n.id === node.id)!.y! - 20
        );
    };

    // Add link elements to the SVG
    const linkElements = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "gray")
      .attr("stroke-width", 1);

    // Add circle elements (nodes) to the SVG
    const circles = svg
      .selectAll("circle.node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 20)
      .attr("cx", (d: ContactNode) => d.x!)
      .attr("cy", (d: ContactNode) => d.y!)
      .attr("fill", "none")
      .call(dragCircle);

    // Add image elements (profile pictures) to the SVG
    const images = svg
      .selectAll("image")
      .data(nodes.filter((d: ContactNode) => d.imgUrl))
      .enter()
      .append("image")
      .attr("xlink:href", (d: ContactNode) => d.imgUrl || "")
      .attr("x", (d: ContactNode) => d.x! - 20)
      .attr("y", (d: ContactNode) => d.y! - 20)
      .attr("width", 40)
      .attr("height", 40)
      .attr("clip-path", "circle(20px)")
      .call(dragImage);

    // Add text elements (labels) to the SVG
    const labels = svg
      .selectAll("text.label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d: ContactNode) => d.x!)
      .attr("y", (d: ContactNode) => d.y! + 35)
      .attr("text-anchor", "middle")
      .text((d: ContactNode) => d.name || d.label || "");

    // Add title elements (titles) to the SVG
    const titles = svg
      .selectAll(".title")
      .data(nodes.filter((d: ContactNode) => d.title))
      .enter()
      .append("text")
      .attr("class", "title")
      .attr("x", (d: ContactNode) => d.x!)
      .attr("y", (d: ContactNode) => d.y! + 50)
      .attr("text-anchor", "middle")
      .text((d: ContactNode) => d.title || "");
  }, []);

  return <svg id="contact-graph"></svg>;
};

export default ContactGraph;
