import { useState } from 'react';
import axios from 'axios';

const Image = () => {
    const [ image, setImage ]   = useState(null);
    const [ result, setResult ] = useState(null);
    const [breed_images, setBreedImage] = useState([]);
    const [display, setDisplay] = useState(null);

    const noimg = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    const handleImage = (e) => {
        setDisplay(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleSubmit = e => {
        setBreedImage([]);
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', image, image.name);
        let url = 'http://localhost:5000/deep';
        axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
        })
        .then(res => {
        
        setResult(res.data);
        console.log(res.data);
        const breeds = Object.keys(res.data);
        
        for (const breed of breeds) {
            if(breed.split("_")[1]) {
                axios.get(`https://dog.ceo/api/breed/${breed.split("_")[1]}/images`)
                .then(res => {
                    
                    var linkimg = null;
                    for (const link of res.data.message) {
                        if(link.includes(breed.split("_")[0].toLowerCase())) {
                            linkimg = link;
                            break;
                        };
                    } 
                    if(linkimg){
                        setBreedImage(breed_images => [...breed_images, {breed: breed, linkimg: linkimg}])
                        //setTheArray(oldArray => [...oldArray, newElement]);
                    } else {
                        setBreedImage(breed_images => [...breed_images, {breed: breed, linkimg: noimg}])
                    }
                        
                }).catch(err => {
                    console.log(err);
                    setBreedImage(breed_images => [...breed_images, {breed: breed, linkimg: noimg}]);
                });
            } else {
                axios.get(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`)
                .then(res => {
                    var linkimg = res.data.message;
                    if(linkimg){
                        setBreedImage(breed_images => [...breed_images, {breed: breed, linkimg: linkimg}])
                    }
                }).catch(err => {
                    console.log(err);
                    setBreedImage(breed_images => [...breed_images, {breed: breed, linkimg: noimg}]);
                });
            }
        }
        
        })
        .catch(err => console.log(err))      
        
    }
    
    return <div className="content-stanforddogs">
        { display && image &&
        <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center", marginTop: "30px"}}>
            <img width="250" height="250" src={display} alt="displayed image"></img>
        </div>
        }
        <form onSubmit={e => handleSubmit(e)}>
            <input type="file" id="image" accept="image/png, image/jpeg"  onChange={handleImage} required/>
            <input type="submit"/>
        </form>
        {/* { result && <div className="resultat"> 
            {
                Object.keys(result).map((key, per) => <div key={key}>
                    {<p>{key}: {(parseFloat(result[key]) * 100).toFixed(2)} %</p>}
                </div>)
            }
        </div>} */}
        {console.log(breed_images)}
        {breed_images.length > 0 ? <div style={{display: "flex", flexDirection: "row", marginTop: "50px", width: "70%", justifyContent: "space-evenly", alignItems: "center", margin: "40px auto"}}>
            {
        breed_images.map((value, index) => 
        <div key={index} style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems:"center"}}>
            <strong>{value["breed"]}</strong> <img style={(parseFloat(result[value["breed"]]) * 100).toFixed(2) > 80 ? {border: "9px solid green"}: {}} width="200" height="200" src={value["linkimg"]} alt="breed"/>
            <strong style={(parseFloat(result[value["breed"]]) * 100).toFixed(2) > 80 ? {color: "green"}: {}}>{(parseFloat(result[value["breed"]]) * 100).toFixed(2)}%</strong>
        </div>)}</div> : null}
        </div>
}

export default Image;