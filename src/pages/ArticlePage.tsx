import { useState } from "react";

export default function ArticlePage() {
  const [id, setId] = useState("")
  const [content, setContent] = useState<{ paragraph: string, preCode: string }[]>([])
  const addContent = () => {
    const data = {
      id: Number(id), content
    };

    fetch('/blog/api/article/content', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const setParagraph = (value: string, index: number) => {
    const c = [...content]
    c[index].paragraph = value
    setContent([...c])
  }
  const setPreCode = (value: string, index: number) => {
    const c = [...content]
    c[index].preCode = value
    setContent([...c])
  }

  const addRow = () => {
    const c = [...content]
    c.push({
      paragraph: "",
      preCode: ""
    })
    setContent([...c])
  }

  return (
    <div>
      <p>Add a article</p>
      <div>
        <div>
          <label>
            id: <input name="id" type="text" onChange={e => setId(e.target.value)} value={id} />
          </label>
        </div>
        <div>
          {
            content.map((item, index) => {
              return <div>
                <div>
                  <label>
                    paragraph: <textarea name="paragraph" style={{ height: "200px", width: "100%" }} onChange={e => setParagraph(e.target.value.trim(), index)} value={item.paragraph} />
                  </label>
                </div>
                <div>
                  <label>
                    preCode: <textarea style={{ height: "200px", width: "100%" }} name="preCode" onChange={e => setPreCode(e.target.value.trim(), index)} value={item.preCode} />
                  </label>
                </div>
              </div>
            })
          }
        </div>
        <button type="submit" onClick={addContent}>Login</button>
        <button onClick={addRow}>add row</button>
      </div>
    </div >
  );
}