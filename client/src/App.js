import './App.css';
import React from 'react';
import Web3 from 'web3';
import Auction from "./static/Auction.json"
import House from './static/House.png'
import Rk from './static/kk.jpg'
var myContract;



class App extends React.Component {



  constructor() {
    super()

    this.state = {

      bidAmount: 0
    }

  }


  async componentDidMount() {

    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

    console.log(await web3.eth.getAccounts());



    myContract = await new web3.eth.Contract(Auction.abi, Auction.networks[5777].address);

    console.log(await myContract.methods.HighestBid().call());
    console.log(await myContract.methods.HighestBidder().call());
  }

  async putBitFuc(e) {

    e.preventDefault();



    if (typeof window.ethereum !== 'undefined') {




      if (window.ethereum.selectedAddress) {



        console.log(Web3.utils.toWei(this.state.bidAmount, 'ether'))
        console.log(await myContract.methods.putBid().send({ from: window.ethereum.selectedAddress, value: Web3.utils.toWei(this.state.bidAmount, 'ether') }))

        console.log(await myContract.methods.HighestBid().call());

        console.log(await myContract.methods.HighestBidder().call());

      } else {


        console.log(await window.ethereum.request({ method: 'eth_requestAccounts' }));
      }

    } else {



      console.log("your wallet is not connected");
    }
  }


  changeBidAmount(e) {
    e.preventDefault();

    this.setState({ bidAmount: e.target.value })
  }



  render() {

    return (



      <div id='kk' style={
        {



          margin: "0px auto", "display": "flex",
          "justifyContent": "center",

          "flexFlow": "column",

          "alignItems": "center"



        }


      } >
        <section class="NavBarSection">
          <div class="NavBar">
            <div class="Logo">
              <img src={Rk} alt="unable to upload" />
            </div>

            <ul>
              <li class="item" id="item3">
                <a href="">OWNERS</a>
              </li>

              <li class="item" id="item2">
                <a href="">PURCHASE </a>
              </li>

              <li class="item" id="item4">
                <a href="">EXPLORE</a>
              </li>
              <li class="item" id="item4">
                <a href="">ABOUT-US</a>
              </li>
              <li class="item" id="item5">
                <a href="/contact.html">CONTACT US</a>
              </li>
            </ul>
          </div>
        </section>



        <h1>

          Auction Dapp


        </h1>

        <img src={House} alt="unable to upload" />
        <br />

        <br />


        <input type='number' placeholder='Eth' value={this.state.bidAmount} onChange={(e) => this.changeBidAmount(e)} style={{ padding: "8px", border: "1px solid black", color: "blue" }} />

        <br />

        <button id='jj' onClick={(e) => this.putBitFuc(e)} /*style={{ background: "black", padding: "8px", border: "none", color: "white", minWidth: "max-content", borderRadius: "10px" }}*/>PutBid

        </button>
        <br />
        <br />
        <br />
        <br />




      </div >

    );


  }

}



export default App;
