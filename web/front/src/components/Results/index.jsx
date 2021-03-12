import rf from '../../assets/Img/foroest.png';
import dt from '../../assets/Img/tree.jpg';
import svc from '../../assets/Img/svc.png';

const Results = (props) => {



    const handleVotes = () => {
        const test = Object.values(props.result).reduce((a, b) => a + b, 0);
        return test <= 1 ? 0 : 1;
    }


    return (
        <div className="results_container">
            <h1>Result</h1>
            <br/>
            <div className="results_head">
                <div className="algo_result">
                    <h3>Random Forest</h3>
                    <img className="algo_img" src={rf} alt="forest"/>
                    vote : {props.result.RF}
                </div>
                <div className="algo_result">
                    <h3>Decision trees</h3>
                    <img className="algo_img" src={dt} alt="forest"/>
                    vote : {props.result.DT}
                </div>
                <div className="algo_result">
                    <h3>SVC</h3>
                    <img className="algo_img" src={svc} alt="forest"/>
                    vote : {props.result.SVC}
                </div>
            </div>
            <div className="results_final">
                Final vote is {handleVotes()} : {handleVotes() === 0 ? "This person will not change job":"this person will change job"}
            </div>

        </div>
    );
}

export default Results;