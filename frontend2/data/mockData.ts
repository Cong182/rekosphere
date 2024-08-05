export interface Contact {
  id: number;
  name: string;
  familiarityLevel: "A" | "B" | "C" | "D";
  title: string;
  imgUrl: string;
  connections: number[];
}

export const mockData: Contact[] = [
  {
    id: 1,
    name: "Alice",
    familiarityLevel: "A",
    title: "Engineer at Blinkist",
    imgUrl: "/p1.png",
    connections: [0, 2, 3],
  },
  {
    id: 2,
    name: "Bob",
    familiarityLevel: "A",
    title: "Engineer at Blinkist",
    imgUrl: "/p2.png",
    connections: [0, 1, 4],
  },
  {
    id: 3,
    name: "Charlie",
    familiarityLevel: "B",
    title: "Engineer at Blinkist",
    imgUrl: "/p3.png",
    connections: [1, 5],
  },
  {
    id: 4,
    name: "David",
    familiarityLevel: "B",
    title: "Engineer at Blinkist",
    imgUrl: "/p4.png",
    connections: [2, 6],
  },
  {
    id: 5,
    name: "Eve",
    familiarityLevel: "C",
    title: "Engineer at Blinkist",
    imgUrl: "/p5.png",
    connections: [3, 7],
  },
  {
    id: 6,
    name: "Frank",
    familiarityLevel: "C",
    title: "Engineer at Blinkist",
    imgUrl: "/p6.png",
    connections: [4, 8],
  },
  {
    id: 7,
    name: "Grace",
    familiarityLevel: "D",
    title: "Engineer at Blinkist",
    imgUrl: "/p7.png",
    connections: [5, 9],
  },
  {
    id: 8,
    name: "Hank",
    familiarityLevel: "D",
    title: "Engineer at Blinkist",
    imgUrl: "/p8.png",
    connections: [6, 10],
  },
  {
    id: 9,
    name: "Ivy",
    familiarityLevel: "A",
    title: "Engineer at Blinkist",
    imgUrl: "/p9.png",
    connections: [0, 7],
  },
  {
    id: 10,
    name: "Jack",
    familiarityLevel: "B",
    title: "Engineer at Blinkist",
    imgUrl: "/p10.png",
    connections: [8],
  },
];
