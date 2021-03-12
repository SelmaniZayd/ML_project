import { useState } from 'react';

const Image = () => {
    const [ image, setImage ]   = useState(null);
    const [ result, setResult ] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        let data = {
            image,
            image_name: image.name,
        }
        console.log('form data', data);

        // let formData = new FormData();
        // formData.append("image", JSON.stringify(data));
        
        // fetch("http://localhost:5000/", {
        //     method: "POST",
        //     body: formData
        // })
        // .then(res => res.json())
        // .then(data => console.log(JSON.stringify(data)))

        setResult([
            {"skimo_kelb": 0.92}, 
            {"slougia_hawhaw": 0.06}, 
            {"kalboun":0.04}
        ]);
    }
    
    return <div className="content-stanforddogs">
        <form onSubmit={e => handleSubmit(e)}>
            <input type="file" id="image" accept="image/png, image/jpeg"  onChange={e => setImage(e.target.files[0])} required/>
            <input type="submit"/>
        </form>
        { result && <div className="resultat"> 
            {
                result.map((data, key) => <div key={key}>
                    {<p>{Object.keys(data)[0]}: {(data[Object.keys(data)[0]] * 100).toFixed(2)} %</p>}
                </div>)
            }
        </div>}
    </div>
}

export default Image;