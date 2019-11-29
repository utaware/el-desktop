const mermaid = require('mermaid')

const mermaidAPI = mermaid.mermaidAPI

Mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'true',
    theme: "default",
    flowchart:{
      htmlLabels: false,
      useMaxWidth: true,
    }
})

const src = `
sequenceDiagram
A->> B: Query
B->> C: Forward query
Note right of C: Thinking...
C->> B: Response
B->> A: Forward response`

mermaidAPI.render('div', src, (html) => {
  console.log(html)
})