import { useState, useEffect } from 'react';
import Results from '../../components/Results';

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
    const [releventExperience, setReleventExperience] = useState("0");
    const [sendData, setSendData] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        setResult(null);
        setSendData({
            city: parseInt(city.split("_")[1]),
            city_development_index: parseInt(parseFloat(cityDeveloppementIndex)*100),
            gender: parseInt(gender),
            relevent_experience: parseInt(releventExperience),
            enrolled_university: parseInt(endeenrolledUniversity),
            education_level: parseInt(educationLevel),
            major_discipline: parseInt(majorDiscipline),
            experience: parseInt(experience),
            company_size: parseInt(compagnySize),
            company_type: parseInt(compagnyType),
            last_new_job: parseInt(lastNewJob),
            training_hours: parseInt(trainingHours)
        });
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
            console.log(sendData)
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
            placeholder="your city ex (city_52)"
            onChange={(e) => setCity(e.target.value)}
            required
            pattern="^city_[0-9]{1,3}$" />
        <input 
            type="number" step="0.01"
            name="cityDeveloppementIndex"
            onChange={e => setCityDeveloppementIndex(e.target.value)}
            min="0" 
            max="1" 
            placeholder="Indiquer l'indice de développement de la ville" 
            required />
        <select name="gender" onChange={e => setGender(e.target.value)} required>
            <option value="" selected disabled>Gender</option>
            <option value="1">female</option>
            <option value="0">male</option>
            <option value="2">other</option>
        </select>
        <div>
            <input 
                type="radio" 
                id="hasReleventExperience" 
                onClick={() => setReleventExperience("0")}
                name="releventExperiencene" 
                value="0" 
                checked />
            <label for="hasReleventExperience"> Possède une expérience pertinente</label>
        </div>

        <div>
            <input 
                type="radio" 
                id="noReleventExperience"
                onClick={() => setReleventExperience("1")}
                name="releventExperiencene" 
                value="1" />
            <label for="noReleventExperience">Ne possède pas une expérience pertinente</label>
        </div>
        <select name="endeenrolled_university" onChange={e => setEndeenrolledUniversity(e.target.value)} required>
            <option value="" disabled selected>Enrolled in university?</option>
            <option value="1">full Time Course</option>
            <option value="0">no Enrollment</option>
            <option value="2">Part Time Course</option>
        </select>
        <select name="education_level" onChange={e => setEducationLevel(e.target.value)} required>
            <option value="" disabled selected>Education level</option>
            <option value="0">graduate</option>
            <option value="2">highSchool</option>
            <option value="1">masters</option>
            <option value="3">phd</option>
            <option value="4">primarySchool</option>
        </select>
        <select name="major_discipline" onChange={e => setMajorDiscipline(e.target.value)} required>
            <option value="" disabled selected>Major discipline</option>
            <option value="5">Arts</option>
            <option value="3">BusinessDegree</option>
            <option value="1">Humanities</option>
            <option value="4">No major</option>
            <option value="0">STEM</option>
            <option value="2">Other</option>
        </select>
        <select name="experience" onChange={e => setExperience(e.target.value)} required>
            <option value="" disabled selected>your experience</option>
            <option value="1">{"<1"}</option>
            <option value="2">1</option>
            <option value="3">2</option>
            <option value="4">3</option>
            <option value="5">4</option>
            <option value="6">5</option>
            <option value="7">6</option>
            <option value="8">7</option>
            <option value="9">8</option>
            <option value="10">9</option>
            <option value="11">10</option>
            <option value="12">11</option>
            <option value="13">12</option>
            <option value="14">13</option>
            <option value="15">14</option>
            <option value="16">15</option>
            <option value="17">16</option>
            <option value="18">17</option>
            <option value="19">18</option>
            <option value="20">19</option>
            <option value="21">20</option>
            <option value="0">{">20"}</option>
        </select>
        <select name="compagny_size" onChange={e => setCompagnySize(e.target.value)} required>
            <option value="" disabled selected>Company size</option>
            <option value="4">{"<10"}</option>
            <option value="3">10/49</option>
            <option value="1">100-500</option>
            <option value="5">1000-4999</option>
            <option value="2">10000+</option>
            <option value="0">50-99</option>
            <option value="6">500-999</option>
            <option value="7">5000-9999</option>
        </select>
        <select name="compagny_type" onChange={e => setCompagnyType(e.target.value)} required>
            <option value ="" selected disabled>Company type</option>
            <option value="2">EarlyStageStartup</option>
            <option value="3">FundedStartup</option>
            <option value="4">NGO</option>
            <option value="1">PublicSector</option>
            <option value="0">PvtLtd</option>
            <option value="5">Other</option>
        </select>
        <select name="last_new_job" onChange={e => setLastNewJob(e.target.value)} required>
            <option value="" selected disabled>Last new job</option>
            <option value="5">{">4"}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="0">never</option>
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

    {result ? <Results result={result}/> : null}
    </div>
}

export default Forms;