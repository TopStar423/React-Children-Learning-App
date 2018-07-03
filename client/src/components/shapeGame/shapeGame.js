import React, { Component, Fragment } from 'react';
import './shapeGame.css';
import shape from "./shape.json";
import shapeToDrag from "./shapeToDrag.json";
import ShapeCard from "./shapeCard";
import ShapeToDragCard from "./shapeToDragCard";
import Modal from 'react-responsive-modal';
import Navbar from '../Navbar'


class ShapeGame extends Component {
    state = {
        correctScore: 0,
        incorrectScore: 0,
        questionNum: 0,  //tracks how many questions are asked so far
        shapeNameToGuess: { id: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEGYOD5kQcdYHI6n0KpCiZ_-UmVHsIhOK0OTCc3-pTUQhNIT52", name: "Circle" },  //set to 'Red' initially.....i can't get a randomized initial value here!!!
        shape, //hold shapes to drag to - an exact copy of shape.json
        shapeToDrag, //hold shapes to drag - an exact copy of shapeToDrag.json
        open: false //for Modal
    }



    //************************************************************************************* */
    //randomRender Function = renders tiles to the page.  Renders in randomized fashion.
    //      Other functions used:  shuffle()
    //*************************************************************************************** */
    randomRender = () => {
        //this.setShapeToGuess()

        return (
            this.shuffle(this.state.shape).map(shapeFromShapeArray =>
                <div className="card col-s2 shapeCardIndividual" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
                    <div className="card-title">{shapeFromShapeArray.name}</div>
                    <div className="img-container">
                        <img
                            alt={shapeFromShapeArray.name}
                            src={shapeFromShapeArray.image}
                        />
                    </div>
                </div>)
        )
    }

    //************************************************************************************ */
    //shuffle Function = Fisher-Yates Shuffle, shuffles array contents.
    //**************************************************************************************/
    shuffle = array => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //************************************************************************************* */
    //reinitialize Function = sets the state variables score and incorrectScore to 0 
    //This function also rerenders the tiles in randomized fashion
    //      Other functions used:  randomRender()
    //*************************************************************************************** */
    reinitialize = () => {
        this.setState({ correctScore: 0 })
        this.setState({ incorrectScore: 0 })
        this.randomRender()
    }


   
    //*************************************************************************************** */
    //handleClickedPlayAgain function - handles click event to play again from Modal. 
    //                                - resets game values to 0 and restarts game
    //**************************************************************************************** */
    handleClickPlayAgain = () => {
        let againSound = new Audio("http://www.pacdv.com/sounds/people_sound_effects/laugh-12.wav")
        againSound.play()
        this.setState({ correctScore: 0, incorrectScore: 0, questionNum: 0, shapeNameToGuess: 'Blue' })
        this.pickRandomShapeToDrag()
        this.renderShapeToDrag()
        this.onCloseModal()
    }


    //*************************************************************************************** */
    //handleClickedNotPlayAgain function - handles click event to NOT play again from Modal. 
    //                                   - exits shapeGame and goes back to home
    //**************************************************************************************** */
    handleClickNotPlayAgain = () => {
        let click = new Audio("http://www.pacdv.com/sounds/domestic_sound_effects/door-close-1.wav")
        click.play()
        alert("GOES BACK TO HOME PAGE")
        this.onCloseModal()
    }

    //*************************************************************************************** */
    //pickRandomShapeToDrag function - Gets random shape to drag.  Assigns this so state property shapeNameToGuess
    //**************************************************************************************** */
    pickRandomShapeToDrag = () => {

        let dragShapeToRender = this.state.shapeToDrag[Math.floor(Math.random() * 5)]
        this.setState({ shapeNameToGuess: { id: dragShapeToRender.id, image: dragShapeToRender.image, name: dragShapeToRender.name } })
    }




    //*************************************************************************************** */
    //renderShapetoGuess function - Tells the user what shape to pick.  Text in page.
    //**************************************************************************************** */
    renderShapeToDrag = () => {

        return (
            <div>
                <div className="pulsate">{<ShapeToDragCard key={this.state.shapeNameToGuess.id} id={this.state.shapeNameToGuess.id} image={this.state.shapeNameToGuess.image} draggable />}</div>
            </div>
        )
    }




    //***************************************************************************************/
    //onDrag event (currently empty)
    //*************************************************************************************
        onDragOver = (ev) => {
            ev.preventDefault()
            
        }
    
    //***************************************************************************************/
    //onDrop event - when dragged object is dropped to target, sets off game decision logic
    //               if action is correct or incorrect.  This writes to the state for the scores.
    //               Modals are opened in this module when max number of questions are reached.
    //                  Other functions used:  pickRandomShapeTodDrag(), renderShapeToDrag(),
    //                                         onOpenModal(), modalPlayAgain()
    //*************************************************************************************
        onDrop = (ev) => {
            ev.preventDefault()
    
            let correctSound = new Audio("../soundFiles/yay.mp3")
            let incorrectSound = new Audio("../soundFiles/buzz.mp3")
            
            this.setState({ questionNum: this.state.questionNum + 1 })
    
            if (this.state.shapeNameToGuess.name === ev.target.alt) {
                correctSound.play()
                this.setState({ correctScore: this.state.correctScore + 1 })
            }
            else {
                incorrectSound.play()
                this.setState({ incorrectScore: this.state.incorrectScore + 1 })
            }
    
            this.pickRandomShapeToDrag()
            this.renderShapeToDrag()
    
            if (this.state.questionNum > 3) {
    
                            //WRITE RESULTS TO DB HERE
            
                            let thud = new Audio("http://www.pacdv.com/sounds/domestic_sound_effects/door-close-1.wav")
                            thud.play()
                            { this.onOpenModal() }
                            { this.modalPlayAgain() }
                        }
        }


    //*************************************************************************************** */
    //Modal open and close functions
    //**************************************************************************************** */
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    //*************************************************************************************** */



    //***************************************************************************************/
    //Modal render - render the modal
    //*************************************************************************************
    modalPlayAgain = () => {
        // {this.onOpenModal()}
        let shapeGameCorrect = `Correct: ${this.state.correctScore}`
        let shapeGameWrong = `Incorrect: ${this.state.incorrectScore}`

        return (

            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <h3>Shape Game Score</h3>
                    <h4 className="modalStatsCorrect">{shapeGameCorrect}</h4>
                    <h4 className="modalStatsIncorrect">{shapeGameWrong}</h4>

                    <h3 id="playAgainModalText">Play again?</h3>
                    <card col-6 id="shapePlayAgain" onClick={this.handleClickPlayAgain}><img src="https://i.pinimg.com/originals/f0/8b/99/f08b998f7548448a73134f4d21c4b5f3.gif" /></card>
                    <card col-6 id="shapeNotPlayAgain" onClick={this.handleClickNotPlayAgain}><img src="https://www.smileysapp.com/gif-emoji/thumbs-down.gif" /></card>
                </Modal>
            </div>
        )
    }









    render() {
        const { open } = this.state;
        return (

            <Fragment>
            <Navbar/>
                <div id="shapeGamePage">
                    <h1> The Shape Game!</h1>
                    <div className="container">
                        <div className="rowShapes">
                            {this.randomRender()}
                        </div>
                    </div>

                    <h1>{this.renderShapeToDrag()}</h1>
                    <h1>Drag to the correct shape</h1>
                    <h1>{5 - this.state.questionNum} to go!</h1>

                </div>
                {this.modalPlayAgain()}
            </Fragment>
        )
    }
}
export default ShapeGame;















