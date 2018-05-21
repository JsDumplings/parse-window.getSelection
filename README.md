# parse-window.getselection

parse window get selection to obtain the text inside the selection and other useful information.

### usage

```javascript
import parseNodes from "parse-window.getselection";
const parseNodes = parseNodes();
```

### outputSchema

```javascript
[
  	{
		text: 'TEXT_VALUE_IN_SELECTION', 							// type: string
		isPartial: 'WETHER_HTML_NODE_IS_FULLY_INSIDE_THE_SELECTION' // type: boolean
		parentNode: 'HTML_NODE_CONTAINING_THE_SELECTED_TEXT'		// type: html node

	},
 	...
]
```

### sample demo:

![Alt Text](https://)
![Alt Text](https://)

### sample demo code:

```javascript
import React, { Component } from "react";
import parseNodes from "parse-window.getselection";

class App extends Component {
    constructor() {
        super();
        this.state = {
            parsedNodes: []
        };
        this.parseSelection = this.parseSelection.bind(this);
    }
    parseSelection() {
        const parsedNodes = parseNodes();
        this.setState({ parsedNodes });
    }
    render() {
        const { parsedNodes } = this.state;
        return (
            <div className="App">
                <p className="sample">
                    Et harum<strong>
                        quidem <i>rerum</i> facilis est
                    </strong>et expedita distinctio. Nam libero tempore, cum
                    soluta nobis est eligendi optio cumque nihil impedit quo
                    minus id quod maxime placeat facere possimus, omnis voluptas
                    assumenda est, omnis dolor repellendus. Temporibus autem
                    quibusdam et aut officiis debitis aut rerum necessitatibus
                    saepe eveniet ut et voluptates repudiandae sint et molestiae
                    non recusandae.
                </p>
                <button onClick={this.parseSelection}>parse</button>
                {parsedNodes.length > 0 && (
                    <ul>
                        {parsedNodes.map(function(node, index) {
                            console.log({ node });
                            return (
                                <li
                                    key={index}
                                    style={{
                                        margin: 5,
                                        backgroundColor: "lightgray"
                                    }}
                                >
                                    <h3 style={{ margin: 0 }}>text:</h3>
                                    <span style={{ color: "blue" }}>
                                        {node.text}
                                    </span>
                                    <h3 style={{ margin: 0 }}>isPartial:</h3>
                                    <span style={{ color: "blue" }}>
                                        {node.isPartial.toString()}
                                    </span>
                                    <h3 style={{ margin: 0 }}>parentNode:</h3>
                                    <span style={{ color: "blue" }}>
                                        {node.parentNode.outerHTML}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }
}

export default App;
```
