// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import CytoscapeComponent from "react-cytoscapejs";
// import axios from "axios";
// import cytoscape from "cytoscape";

// const ContactGraph = () => {
//   const cyRef = useRef(null);
//   const [contacts, setContacts] = useState([]);
//   const [userConnections, setUserConnections] = useState([]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get("/api/contacts");
//         const contacts = response.data;
//         setContacts(contacts);

//         // Extract connections to the user
//         const userConnections = contacts
//           .filter((contact) => contact.firsthand)
//           .map((contact) => contact._id);
//         setUserConnections(userConnections);
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const levelConfig = {
//     A: {
//       min: 20,
//       max: 60,
//       color: "black",
//       backgroundColor: "#81a8c2",
//       border: "10px",
//     },
//     B: {
//       min: 70,
//       max: 150,
//       color: "black",
//       backgroundColor: "#97c4e2",
//       border: "10px",
//     },
//     C: {
//       min: 160,
//       max: 270,
//       color: "black",
//       backgroundColor: "#cae7fb",
//       border: "10px",
//     },
//     D: {
//       min: 280,
//       max: 360,
//       color: "black",
//       backgroundColor: "#def2ff",
//     },
//     User: {
//       min: 1,
//       max: 2,
//       color: "red",
//       backgroundColor: "#6b8ba0",
//       border: "10px",
//     },
//   };

//   const calculatePosition = (level, index, total) => {
//     const { min, max } = levelConfig[level];
//     const radius = min + Math.random() * (max - min);
//     const angle = ((2 * Math.PI) / total) * index;
//     return {
//       x: window.innerWidth / 2 + radius * Math.cos(angle),
//       y: window.innerHeight / 2 + radius * Math.sin(angle),
//     };
//   };

//   const elements = [
//     {
//       data: { id: "0", label: "You" },
//       position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
//       locked: true,
//       classes: "user",
//       style: { "background-color": levelConfig.User.color },
//     },
//     ...contacts.map((contact, index) => ({
//       data: {
//         id: contact._id,
//         label: contact.fullName,
//         level: contact.relationshipLevel,
//       },
//       position: calculatePosition(
//         contact.relationshipLevel,
//         index,
//         contacts.length
//       ),
//       locked: false,
//       style: {
//         "background-color": levelConfig[contact.relationshipLevel].color,
//       },
//     })),
//     ...contacts.reduce((edges, contact) => {
//       if (contact.connectedThrough) {
//         edges.push({
//           data: {
//             source: contact.connectedThrough.toString(),
//             target: contact._id.toString(),
//           },
//         });
//       }
//       return edges;
//     }, []),
//     ...userConnections.map((connection) => ({
//       data: { source: "0", target: connection.toString() },
//     })),
//   ];

//   const layout = {
//     name: "preset",
//   };

//   useEffect(() => {
//     if (cyRef.current) {
//       const cy = cyRef.current;

//       cy.on("dragfree", "node", (event) => {
//         const node = event.target;
//         if (node.id() === "0") return; // Skip the user node

//         const level = node.data("level");
//         const { min, max } = levelConfig[level];

//         const dist = Math.sqrt(
//           Math.pow(node.position("x") - window.innerWidth / 2, 2) +
//             Math.pow(node.position("y") - window.innerHeight / 2, 2)
//         );
//         if (dist < min || dist > max) {
//           const angle = Math.atan2(
//             node.position("y") - window.innerHeight / 2,
//             node.position("x") - window.innerWidth / 2
//           );
//           const newRadius = Math.max(min, Math.min(max, dist));
//           node.position({
//             x: window.innerWidth / 2 + newRadius * Math.cos(angle),
//             y: window.innerHeight / 2 + newRadius * Math.sin(angle),
//           });
//         }
//       });

//       cy.$(".user").ungrabify();
//     }
//   }, [cyRef.current]);

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         className="level-zone"
//         style={{
//           background: levelConfig.D.backgroundColor,
//           width: `${(levelConfig.D.max - 30) * 2}px`,
//           height: `${(levelConfig.D.max - 30) * 2}px`,
//           border: `${levelConfig.D.border} solid white`,
//           position: "absolute",
//           zIndex: -4,
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           borderRadius: "50%",
//         }}
//       />
//       <div
//         className="level-zone"
//         style={{
//           background: levelConfig.C.backgroundColor,
//           width: `${(levelConfig.C.max - 30) * 2}px`,
//           height: `${(levelConfig.C.max - 30) * 2}px`,
//           border: `${levelConfig.C.border} solid white`,
//           position: "absolute",
//           zIndex: -3,
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           borderRadius: "50%",
//         }}
//       />
//       <div
//         className="level-zone"
//         style={{
//           background: levelConfig.B.backgroundColor,
//           width: `${(levelConfig.B.max - 30) * 2}px`,
//           height: `${(levelConfig.B.max - 30) * 2}px`,
//           border: `${levelConfig.B.border} solid white`,
//           position: "absolute",
//           zIndex: -2,
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           borderRadius: "50%",
//         }}
//       />
//       <div
//         className="level-zone"
//         style={{
//           background: levelConfig.A.backgroundColor,
//           width: `${(levelConfig.A.max - 30) * 2}px`,
//           height: `${(levelConfig.A.max - 30) * 2}px`,
//           border: `${levelConfig.A.border} solid white`,
//           position: "absolute",
//           zIndex: -1,
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           borderRadius: "50%",
//         }}
//       />
//       <CytoscapeComponent
//         elements={elements}
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//         layout={layout}
//         cy={(cy) => {
//           cyRef.current = cy;
//           cy.boxSelectionEnabled(false);
//           cy.userPanningEnabled(false);
//           cy.userZoomingEnabled(false);
//         }}
//         stylesheet={[
//           {
//             selector: "node",
//             style: {
//               "background-color": "data(color)",
//               label: "data(label)",
//               width: "1px",
//               height: "1px",
//               "font-size": "1px",
//               "text-valign": "center",
//               "text-halign": "center",
//               "text-background-opacity": 0,
//               "text-margin-y": "-2px", // Adjust the text position within the node
//             },
//           },
//           {
//             selector: ".user",
//             style: {
//               "background-color": levelConfig.User.color,
//               label: "You",
//               width: "1px",
//               height: "1px",
//               "font-size": "1px",
//               "text-valign": "center",
//               "text-halign": "center",
//               "text-background-opacity": 0,
//               "text-margin-y": "-2px", // Adjust the text position within the node
//             },
//           },
//         ]}
//       />
//       <style jsx>{`
//         .level-zone {
//           border-radius: 50%;
//           pointer-events: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ContactGraph;

"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";

const ContactGraph = () => {
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contacts");
        const contacts = response.data;
        renderGraph(contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    const renderGraph = (contacts) => {
      const svg = d3.select("#contact-graph");
      const width = window.innerWidth * 0.8;
      const height = window.innerHeight * 0.8;
      svg
        .attr("width", width)
        .attr("height", height)
        .style("display", "block")
        .style("margin", "auto");

      // Define radii for different relationship levels with colors
      const radii = {
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

      // Add background circles for each relationship level
      Object.keys(radii).forEach((level) => {
        svg
          .append("circle")
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .attr("r", (radii[level].min + radii[level].max) / 2)
          .attr("fill", radii[level].backgroundColor)
          .attr("opacity", 0.2)
          .lower();
      });

      // Get the position of nodes based on their relationship level and index
      const getPosition = (level, index) => {
        if (!radii[level]) {
          console.error("Invalid relationship level:", level);
          return { x: 0, y: 0 };
        }
        const radius = (radii[level].min + radii[level].max) / 2;
        const angle =
          (index /
            contacts.filter((d) => d.relationshipLevel === level).length) *
          2 *
          Math.PI;
        return {
          x: width / 2 + radius * Math.cos(angle),
          y: height / 2 + radius * Math.sin(angle),
        };
      };

      // Initial central user node
      const nodes = [
        {
          id: 0,
          label: "User",
          imgUrl: "/profile.png",
          x: width / 2,
          y: height / 2,
        },
      ];

      let levelCounters = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      };

      // Add contacts to the nodes array with their respective positions
      contacts.forEach((contact) => {
        const { x, y } = getPosition(
          contact.relationshipLevel,
          levelCounters[contact.relationshipLevel]
        );
        levelCounters[contact.relationshipLevel]++;
        nodes.push({ ...contact, x, y });
      });

      // Create an array of links based on contact connections
      const links = [];
      contacts.forEach((contact) => {
        if (contact.firsthand) {
          links.push({ source: 0, target: contact._id });
        }
        if (contact.connections) {
          contact.connections.forEach((connectionId) => {
            links.push({ source: contact._id, target: connectionId });
          });
        }
      });

      // Function to keep node within its respective zone
      const keepNodeInZone = (node) => {
        const level = node.relationshipLevel;
        const angle = Math.atan2(node.y - height / 2, node.x - width / 2);
        const distanceFromCenter = Math.sqrt(
          Math.pow(node.x - width / 2, 2) + Math.pow(node.y - height / 2, 2)
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
        .drag()
        .on("start", (event, d) => {
          d3.select(event.sourceEvent.target).raise().classed("active", true);
        })
        .on("drag", (event, d) => {
          d.x = event.x;
          d.y = event.y;
          keepNodeInZone(d); // Keep node within its zone
          d3.select(event.sourceEvent.target).attr("cx", d.x).attr("cy", d.y);
          updateLinkAndLabelPositions(d);
        })
        .on("end", (event, d) => {
          d3.select(event.sourceEvent.target).classed("active", false);
        });

      // Define drag behavior functions for image elements
      const dragImage = d3
        .drag()
        .on("start", (event, d) => {
          d3.select(event.sourceEvent.target).raise().classed("active", true);
        })
        .on("drag", (event, d) => {
          d.x = event.x;
          d.y = event.y;
          keepNodeInZone(d); // Keep node within its zone
          d3.select(event.sourceEvent.target)
            .attr("x", d.x - 20)
            .attr("y", d.y - 20);
          updateLinkAndLabelPositions(d);
        })
        .on("end", (event, d) => {
          d3.select(event.sourceEvent.target).classed("active", false);
        });

      // Update link and label positions when a node is dragged
      const updateLinkAndLabelPositions = (d) => {
        svg
          .selectAll(".link")
          .attr("x1", (link) =>
            link.source === d.id
              ? d.x
              : nodes.find((n) => n._id === link.source).x
          )
          .attr("y1", (link) =>
            link.source === d.id
              ? d.y
              : nodes.find((n) => n._id === link.source).y
          )
          .attr("x2", (link) =>
            link.target === d.id
              ? d.x
              : nodes.find((n) => n._id === link.target).x
          )
          .attr("y2", (link) =>
            link.target === d.id
              ? d.y
              : nodes.find((n) => n._id === link.target).y
          );
        svg
          .selectAll(".label")
          .attr("x", (node) =>
            node._id === d.id ? d.x : nodes.find((n) => n._id === node._id).x
          )
          .attr("y", (node) =>
            node._id === d.id
              ? d.y + 35
              : nodes.find((n) => n._id === node._id).y + 35
          );
        svg
          .selectAll("image")
          .attr("x", (node) =>
            node._id === d.id
              ? d.x - 20
              : nodes.find((n) => n._id === node._id).x - 20
          )
          .attr("y", (node) =>
            node._id === d.id
              ? d.y - 20
              : nodes.find((n) => n._id === node._id).y - 20
          );
      };

      // Add link elements to the SVG
      svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "gray")
        .attr("stroke-width", 1);

      // Add circle elements (nodes) to the SVG
      svg
        .selectAll("circle.node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", "black")
        .call(dragCircle);

      // Add image elements (profile pictures) to the SVG
      svg
        .selectAll("image")
        .data(nodes.filter((d) => d.imgUrl))
        .enter()
        .append("image")
        .attr("xlink:href", (d) => d.imgUrl || "")
        .attr("x", (d) => d.x - 20)
        .attr("y", (d) => d.y - 20)
        .attr("width", 40)
        .attr("height", 40)
        .attr("clip-path", "circle(20px)")
        .call(dragImage);

      // Add text elements (labels) to the SVG
      svg
        .selectAll("text.label")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y + 35)
        .attr("text-anchor", "middle")
        .text((d) => d.fullName || d.label || "");

      // Add title elements (titles) to the SVG
      svg
        .selectAll(".title")
        .data(nodes.filter((d) => d.title))
        .enter()
        .append("text")
        .attr("class", "title")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y + 50)
        .attr("text-anchor", "middle")
        .text((d) => d.title || "");
    };
  }, []);

  return (
    <svg id="contact-graph" className="absolute inset-0 w-full h-full"></svg>
  );
};

export default ContactGraph;
