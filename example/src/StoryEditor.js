import * as React from 'react'
import {Editor} from 'slate-react'
import {Value} from 'slate'

//import {inject} from "slate-react-dnd-plugin"
import {inject} from "../../dist/index"

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

class ParagraphNode extends React.Component {
    render(){
        return (<p {...this.props.attributes} >{this.props.children}</p>)
    }
}

const blockStyle = {
    border: '1px dashed gray',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    opacity: 1
};

const plugins = inject([
    {
        renderNode: (props) => {
            switch (props.node.type) {
                case 'paragraph':
                    return <ParagraphNode {...props} />;
                default:
                    return null;
            }
        }
    }
],{
    renderBlock: (isDragging,children) => {
        return <div style={blockStyle}>{children}</div>
    }
});

class StoryEditor extends React.Component {

    state = {
        value: initialValue
    };

    onChange({value}){
        this.setState({value})
    }

    render(){
        return (
            <Editor
                value={this.state.value}
                plugins={plugins}
                onChange={this.onChange.bind(this)}/>
        )
    }
}

export default StoryEditor;