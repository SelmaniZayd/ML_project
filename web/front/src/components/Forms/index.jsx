import { useState, useEffect } from 'react';

const Forms = () => {
    
    const [city, setCity] = useState(null);
    const [cityDeveloppementIndex, setCityDeveloppementIndex] = useState(null)
    const [gender, setGender] = useState(null)
    const [endeenrolledUniversity, setEndeenrolledUniversity] = useState(null)
    const [educationLevel, setEducationLevel] = useState(null)
    const [majorDiscipline, setMajorDiscipline] = useState(null)
    const [experience, setExperience] = useState(null)
    const [compagnySize, setCompagnySize] = useState(null)
    const [compagnyType, setCompagnyType] = useState(null)
    const [lastNewJob, setLastNewJob] = useState(null)
    const [trainingHours, setTrainingHours] = useState(null)
    const [releventExperience, setReleventExperience] = useState('hasReleventExperience');
    const [sendData, setSendData] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        setSendData({
            city: city.split("_")[1],
            city_development_index: cityDeveloppementIndex,
            gender: gender,
            relevent_experience: releventExperience,
            enrolled_university: endeenrolledUniversity,
            education_level: educationLevel,
            major_discipline: majorDiscipline,
            experience: experience,
            company_size: compagnySize,
            company_type: compagnyType,
            last_new_job: lastNewJob,
            training_hours: trainingHours
        });
        console.log(sendData);
    }

    useEffect(() => {
        if(sendData !== null){
            fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(sendData),
            })
            .then((response) => response.json())
            .then((data) => setResult(data))
            .catch(() => setResult('Erreur, pas de données'));
        }
    }, [sendData])

    useEffect(() => {
        console.log('result', result);
    }, [result])

    return <div className="content-forms">
    
    <form method="post" onSubmit={e => handleSubmit(e)}>

        <h2>Formulaire</h2>
        <input 
            type="text" 
            name="city" 
            placeholder="Indiquer votre ville"
            onChange={(e) => setCity(e.target.value)}
            required />
        <input 
            type="number" 
            name="cityDeveloppementIndex"
            onChange={e => setCityDeveloppementIndex(e.target.value)}
            min="0" 
            max="2" 
            placeholder="Indiquer l'indice de développement de la ville" 
            required />
        <select name="gender" onChange={e => setGender(e.target.value)} required>
            <option value="female">Femme</option>
            <option value="male">Homme</option>
            <option value="others">Autres</option>
            <option value="none" selected>N/A</option>
        </select>
        <div>
            <input 
                type="radio" 
                id="hasReleventExperience" 
                onClick={() => setReleventExperience('hasReleventExperience')}
                name="releventExperiencene" 
                value="hasReleventExperience" 
                checked />
            <label for="hasReleventExperience"> Possède une expérience pertinente</label>
        </div>

        <div>
            <input 
                type="radio" 
                id="noReleventExperience"
                onClick={() => setReleventExperience('noReleventExperience')}
                name="releventExperiencene" 
                value="noReleventExperience" />
            <label for="noReleventExperience">Ne possède pas une expérience pertinente</label>
        </div>
        <select name="endeenrolled_university" onChange={e => setEndeenrolledUniversity(e.target.value)} required>
            <option value="fullTimeCourse">Temps Pleins</option>
            <option value="noEnrollment">Pas inscrit</option>
            <option value="PartTimeCourse">Temps Partiel</option>
            <option value="none" selected>N/A</option>
        </select>
        <select name="education_level" onChange={e => setEducationLevel(e.target.value)} required>
            <option value="graduate">Diplômé</option>
            <option value="highSchool">Lycée</option>
            <option value="masters">Master</option>
            <option value="phd">Doctorat</option>
            <option value="primarySchool">Primaire</option>
            <option value="none" selected>N/A</option>
        </select>
        <select name="major_discipline" onChange={e => setMajorDiscipline(e.target.value)} required>
            <option value="Arts">Arts</option>
            <option value="BusinessDegree ">Diplôme de commerce</option>
            <option value="Humanities">Science Humaine</option>
            <option value="No Major">Pas de majeur</option>
            <option value="STEM">STEM</option>
            <option value="Other">Autres</option>
            <option value="none" selected>N/A</option>
        </select>
        <input 
            type="text" 
            name="experience"
            onChange={e => setExperience(e.target.value)}
            placeholder="Indiquer votre niveau d'expérience" 
            required />
        <select name="compagny_size" onChange={e => setCompagnySize(e.target.value)} required>
            <option value="<10">{"<10"}</option>
            <option value="10/49">10/49</option>
            <option value="100-500">100-500</option>
            <option value="1000-4999">1000-4999</option>
            <option value="10000+">10000+</option>
            <option value="50-99">50-99</option>
            <option value="500-999">500-999</option>
            <option value="5000-9999">5000-9999</option>
            <option value="none" selected>N/A</option>
        </select>
        <select name="compagny_type" onChange={e => setCompagnyType(e.target.value)} required>
            <option value="EarlyStageStartup" >Démarrage Précoce</option>
            <option value="FundedStartup">Démarrage Financé</option>
            <option value="NGO">NGO</option>
            <option value="PublicSector">Secteur Public</option>
            <option value="PvtLtd">PvtLtd</option>
            <option value="Other">Autres</option>
            <option value="none" selected>N/A</option>
        </select>
        <select name="last_new_job" onChange={e => setLastNewJob(e.target.value)} required>
            <option value=">4">{">4"}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="never">never</option>
            <option value="none" selected>N/A</option>
            </select>
        <input 
            type="number" 
            name="timingHours"
            onChange={e => setTrainingHours(e.target.value)} 
            min="1" 
            max="336" 
            placeholder="Indiquer les heures de chronométrage" 
            required />
        <input type="submit" value="Valider" name="valider"/>
    </form>
    </div>
}

export default Forms;