import dog1 from "../../assets/Img/dog1.jpg";
import dog2 from "../../assets/Img/dog2.jpg";
import dog3 from "../../assets/Img/dog3.jpg";
import dog4 from "../../assets/Img/dog4.jpg";



const Home = () => {

const src1 = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F09%2F22%2F50-cute-dog-names.jpg";

const imgstyle = {border: "2px solid black", borderRadius: "50%"}


return <div className="content-home" >
    <h1> Projet : Image classification à l’aide du Deep Learning</h1>
    <h4>En tant que bénévole pour l'association de protection des animaux de notre quartier.
         Il est malheureusement difficile pour nous de référencer toutes les races de chien (depuis la création de l'association jusqu'à maintenant). 
         Pour palier ce souci, nous avons mis en place un algorithme permettant l'indexation des races de chiens selon une photo choisie.</h4>

    <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", marginTop: "60px"}}>
        <img width="200" height="200" src={src1} alt="" style={imgstyle}/>
        <img width="200" height="200" src={dog1} alt="" style={imgstyle}/>
        <img width="200" height="200" src={dog2} alt="" style={imgstyle}/>
        <img width="200" height="200" src={dog3} alt="" style={imgstyle}/>
        <img width="200" height="200" src={dog4} alt="" style={imgstyle}/>
    </div>
 </div>}

export default Home;