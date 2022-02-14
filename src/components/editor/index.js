import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

const Editor = ({ code, setCode, codeType, minHeight, disabled }) => {
  const [realCodeType, setRealCodeType] = React.useState("c")

  React.useEffect(() => {
    let tmpCodeType = "c"
    if (codeType === "C") {
      tmpCodeType = "c"
    } else if (codeType === "CPP") {
      tmpCodeType = "cpp"
    } else if (codeType === "JAVA") {
      tmpCodeType = "java"
    } else if (codeType === "PYTHON") {
      tmpCodeType = "python"
    }
    setRealCodeType(tmpCodeType)
  }, [codeType])

  return (
    <CodeEditor
      disabled={disabled}
      value={code}
      language={realCodeType}
      placeholder={`Please enter ${codeType} code.`}
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      minHeight={minHeight}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}

export default Editor