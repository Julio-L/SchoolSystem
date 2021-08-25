import React from 'react';
import Tool from './Tool';
import './Toolmanager.css';

const ToolManager = ()=>{
    let tools = [
       {toolName: "CREATE USER", page: "users"},
       {toolName: "ANNOUNCEMENTS", page: "announcements"},
       {toolName: "TEST-TOOL", page:"test"},
       {toolName: "TEST-TOOL", page:"test"},
       {toolName: "TEST-TOOL", page:"test"},
    ];

    return(
        <div className = "toolmanager-cont">
            {tools.map(tool=>(
                <Tool info={tool}></Tool>
            ))}
        </div>
    )

}

export default ToolManager;