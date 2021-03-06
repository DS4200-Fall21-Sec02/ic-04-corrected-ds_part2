
// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization 
let svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white') 
  .style('border', 'solid')
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'd3-tooltip')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('padding', '10px')
    .style('background', 'rgba(0,0,0,0.6)')
    .style('border-radius', '4px')
    .style('color', '#fff')
    .text('a simple tooltip');


//read data

d3.csv("data/data.csv").then(function (data) {

    const downshift = 30;
    //rows
    const rowsList = ["A", "B", "C", "D", "E", "F", "G"]

    //number of columns
    const col = data.columns.slice(1);

    //number of rows
    const r =  data.map( d => d.x);

    const hoverColor = "#FFC0CB";
    const staticColor = '#ADD8E6';

    //x axis
    const x = d3.scaleBand().domain(rowsList).range([0, width + 30]).padding(1,2);

    //y axis
    const y = d3.scaleLinear()
        .domain([0,150])
        .range([height, 0]);


    //place on the y axis


    svg1.append("g").attr()
    svg1.append("g")
        .attr("transform", "translate(" + margin.left + ", " + downshift + ")")
                               .call(d3.axisLeft(y));

    //limit the x
    let x0 = d3.scaleBand()
        .domain(data.map (d => d[data.columns[0]]))
        .rangeRound([0, width])
        .paddingInner(0.1);

    let x1 = d3.scaleBand()
        .domain(col)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);


    xAxis = g => g
     .attr("transform", `translate(45, ${height + downshift})`)
        .call(d3.axisBottom(x).tickSize(0));




    svg1.append("g")
      .call(xAxis);


     svg1.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
         .attr("transform", d => `translate(${x0(d[data.columns[0]])},0)`)
            .selectAll("rect")
            .data(d => col.map(key => ({key, value: d[key]})))
            .join("rect")
            .attr("x", d => x1(d.key) + 15 + margin.left)
            .attr("y", d => y(d.value) + downshift)
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", staticColor )
            .on('mouseover', function (d, i) {
          tooltip
            .html(
              `<div>Value: ${i.value}</div>`
            )
            .style('visibility', 'visible');
          d3.select(this).transition().attr('fill', hoverColor);
      }).on('mousemove', function () {
          tooltip
            .style('top', d3.event.pageY - 10 + 'px')
            .style('left', d3.event.pageX + 10 + 'px');
      })
      .on('mouseout', function () {
          tooltip.html(``).style('visibility', 'hidden');
          d3.select(this).transition().attr('fill', staticColor);
      })

 // svg1.append("g")
 //    .attr("transform", `translate(0, ${height})`)
 //    .call(d3.axisBottom(x).tickSize(0));

 //    svg1.append("g")
 //    .call(legend);

   

})

