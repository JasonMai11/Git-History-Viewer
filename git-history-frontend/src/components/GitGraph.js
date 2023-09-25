import React, { useEffect } from 'react';
import * as d3 from 'd3';

function GitGraph({ commits, onSelectCommit }) {
    useEffect(() => {
        if (commits.length === 0) return;

        // Clear existing SVG (if any) before drawing
        d3.select("#git-graph").html("");

        const circleRadius = 15;
        const circleSpacing = 50;
        const svgWidth = 800;
        const svgHeight = commits.length * circleSpacing + circleRadius * 2;

        const svg = d3.select("#git-graph")
        .append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .style("max-width", "100%")
        .style("height", "auto");
    
        // Lines connecting commits
        svg.selectAll("line")
            .data(commits.slice(1))
            .enter()
            .append("line")
            .attr("x1", svgWidth / 2)
            .attr("y1", (d, i) => i * circleSpacing + circleRadius)
            .attr("x2", svgWidth / 2)
            .attr("y2", (d, i) => (i + 1) * circleSpacing)
            .attr("stroke", "#999")
            .attr("stroke-width", 2);

        // Circles representing commits
        const circles = svg.selectAll("circle")
            .data(commits)
            .enter()
            .append("circle")
            .attr("cx", svgWidth / 2)
            .attr("cy", (d, i) => i * circleSpacing + circleRadius)
            .attr("r", circleRadius)
            .attr("fill", "#3498db")
            .attr("stroke", "#2980b9")
            .attr("stroke-width", 3);

        // Hover effects
        circles.on("mouseover", function() {
                d3.select(this).attr("fill", "#e74c3c");
            })
            .on("mouseout", function() {
                d3.select(this).attr("fill", "#3498db");
            })
            .on("click", (event, d) => {
                onSelectCommit(d);
            });

        // Commit date and message
        svg.selectAll("text.date")
            .data(commits)
            .enter()
            .append("text")
            .attr("class", "date")
            .attr("x", svgWidth / 2 + circleRadius + 10)
            .attr("y", (d, i) => i * circleSpacing + circleRadius)
            .attr("alignment-baseline", "middle")
            .text(d => new Date(d.commit.author.date).toLocaleDateString());

        svg.selectAll("text.message")
            .data(commits)
            .enter()
            .append("text")
            .attr("class", "message")
            .attr("x", svgWidth / 2 + circleRadius + 100) // Adjust for better positioning
            .attr("y", (d, i) => i * circleSpacing + circleRadius)
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "start")
            .text(d => d.commit.message.split("\n")[0]) // Display only the first line of the commit message
            .attr("clip-path", "url(#clip)");

        // Define a clip-path to truncate long commit messages
        svg.append("defs")
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("x", svgWidth / 2 + circleRadius + 100)
            .attr("y", 0)
            .attr("width", svgWidth - (svgWidth / 2 + circleRadius + 120))
            .attr("height", svgHeight);

    }, [commits, onSelectCommit]);

    return (
        <div id="git-graph"></div>
    );
}

export default GitGraph;
