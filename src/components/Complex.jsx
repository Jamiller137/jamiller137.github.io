import React, { useState, useRef, useEffect, useCallback } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";

// quick implementation of visualization akin to zen sight

const Complex = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [faceOpacity, setFaceOpacity] = useState(0.9);
  const [facePercentage, setFacePercentage] = useState(1.0);
  const [nodeCount, setNodeCount] = useState(42);
  const [edgeProbability, setEdgeProbability] = useState(0.06);
  const [isGenerating, setIsGenerating] = useState(false);

  const fgRef = useRef();
  const facesRef = useRef([]);
  const faceTrianglesRef = useRef([]);

  const generateGraphData = useCallback(() => {
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      val: Math.random() * 4 + 1,
    }));

    const links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < edgeProbability) {
          links.push({
            source: i,
            target: j,
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
          });
        }
      }
    }
    return { nodes, links };
  }, [nodeCount, edgeProbability]);

  const findTriangles = useCallback((data) => {
    const triangles = [];
    const adj = {};
    data.nodes.forEach((node) => (adj[node.id] = new Set()));
    data.links.forEach((link) => {
      const src =
        typeof link.source === "object" ? link.source.id : link.source;
      const tgt =
        typeof link.target === "object" ? link.target.id : link.target;
      adj[src].add(tgt);
      adj[tgt].add(src);
    });

    for (let i = 0; i < data.nodes.length; i++) {
      for (let j of adj[i]) {
        if (j > i) {
          for (let k of adj[i]) {
            if (k > j && adj[j].has(k)) {
              triangles.push([i, j, k]);
            }
          }
        }
      }
    }
    return triangles;
  }, []);

  const removeFaces = useCallback(() => {
    const fg = fgRef.current;
    if (!fg) return;

    facesRef.current.forEach((face) => {
      fg.scene().remove(face);
      face.geometry?.dispose();
      face.material?.dispose();
    });
    facesRef.current = [];
    faceTrianglesRef.current = [];
  }, []);

  const updateFacePositions = useCallback(() => {
    facesRef.current.forEach((face, index) => {
      const triangle = faceTrianglesRef.current[index];
      if (!triangle) return;

      const positions = triangle.map((nodeId) => {
        const node = graphData.nodes.find((n) => n.id === nodeId);
        return node && typeof node.x !== "undefined"
          ? new THREE.Vector3(node.x || 0, node.y || 0, node.z || 0)
          : null;
      });

      if (positions.some((pos) => !pos)) return;

      const vertices = new Float32Array(
        positions.flatMap((pos) => pos.toArray()),
      );
      face.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3),
      );
      face.geometry.computeVertexNormals();
      face.geometry.attributes.position.needsUpdate = true;
    });
  }, [graphData]);

  const addFacesToScene = useCallback(() => {
    const fg = fgRef.current;
    if (!fg) return;

    removeFaces();
    const triangles = findTriangles(graphData)
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(findTriangles(graphData).length * facePercentage));

    triangles.forEach((triangle) => {
      const nodePositions = triangle.map((nodeId) =>
        graphData.nodes.find((n) => n.id === nodeId),
      );

      if (nodePositions.some((node) => !node || typeof node.x === "undefined"))
        return;

      faceTrianglesRef.current.push(triangle);
      const positions = nodePositions.map(
        (node) => new THREE.Vector3(node.x || 0, node.y || 0, node.z || 0),
      );

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array(positions.flatMap((pos) => pos.toArray())),
          3,
        ),
      );
      geometry.computeVertexNormals();

      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        transparent: true,
        opacity: faceOpacity,
        side: THREE.DoubleSide,
      });

      const face = new THREE.Mesh(geometry, material);
      fg.scene().add(face);
      facesRef.current.push(face);
    });
  }, [graphData, faceOpacity, facePercentage, findTriangles, removeFaces]);

  const generateNewComplex = useCallback(() => {
    setIsGenerating(true);
    removeFaces();
    setGraphData(generateGraphData());
    setTimeout(() => setIsGenerating(false), 1000);
  }, [generateGraphData, removeFaces]);

  useEffect(() => {
    setGraphData(generateGraphData());
  }, [generateGraphData]);

  useEffect(() => {
    facesRef.current.forEach((face) => {
      if (face.material) face.material.opacity = faceOpacity;
    });
  }, [faceOpacity]);

  return (
    <div className="complex-container">
      <div className="complex-controls">
        <h2>Simplicial Complex Visualization</h2>

        <div className="control-group">
          <button
            className={`control-button ${isGenerating ? "generating" : ""}`}
            onClick={generateNewComplex}
            disabled={isGenerating}
          >
            New Random Complex
          </button>
          <button
            className="control-button"
            onClick={addFacesToScene}
            disabled={isGenerating}
          >
            Generate Faces
          </button>
        </div>

        <div className="slider-group">
          {[
            {
              label: "Nodes",
              value: nodeCount,
              min: 5,
              max: 100,
              step: 1,
              setter: setNodeCount,
            },
            {
              label: "Edge Probability",
              value: edgeProbability,
              min: 0.01,
              max: 0.2,
              step: 0.01,
              setter: setEdgeProbability,
            },
            {
              label: "Face Opacity",
              value: faceOpacity,
              min: 0.1,
              max: 1,
              step: 0.1,
              setter: setFaceOpacity,
            },
            {
              label: "Face Percentage",
              value: facePercentage,
              min: 0.1,
              max: 1,
              step: 0.05,
              setter: setFacePercentage,
            },
          ].map(({ label, value, min, max, step, setter }) => (
            <label key={label}>
              {label}:{" "}
              {label === "Face Percentage"
                ? Math.round(value * 100) + "%"
                : typeof value === "number"
                  ? value.toFixed(label === "Nodes" ? 0 : 2)
                  : value}
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) =>
                  setter(
                    label === "Nodes"
                      ? parseInt(e.target.value)
                      : parseFloat(e.target.value),
                  )
                }
              />
            </label>
          ))}
        </div>
      </div>

      <div className="complex-visualization">
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeAutoColorBy="color"
          nodeVal="val"
          linkColor="color"
          linkWidth={2}
          linkOpacity={0.9}
          backgroundColor="#000011"
          showNavInfo={false}
          controlType="orbit"
          onEngineStop={() => setTimeout(addFacesToScene, 500)}
          onEngineTick={updateFacePositions}
          onNodeClick={(node) => {
            const originalColor = node.color;
            node.color = "#ff0000";
            setTimeout(() => (node.color = originalColor), 1000);
          }}
          onLinkClick={(link) => {
            const originalColor = link.color;
            link.color = "rgba(255, 255, 0, 0.8)";
            setTimeout(() => (link.color = originalColor), 1000);
          }}
        />

        {isGenerating && (
          <div className="loading-overlay">
            <div className="loading-spinner">Generating Complex...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complex;
