// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.4.0 <0.9.0;

contract Auction{
    mapping(address => uint) biddersData;
   
    uint highestBidAmount;
   
    address highestBidder;
   
    uint startTime=block.timestamp;
   
    uint endTime;
   
    address owner;
   
    bool auctionEnded=false;
   
    constructor(){
   
   
        owner=msg.sender;
   
    }


    //put new bid
    function putBid() public payable{
        
        //verify require value IS NOT ZERO
        uint CalculateAmount=biddersData[msg.sender]+msg.value;

        //check session not ended
        //require(auctionEnded==true,"auction is ended");
        //require(block.timestamp<=endTime,"Auction is ended");

       require(msg.value>0,"BID CANNOT BE ZERO");
        
        
        //check highestbid;
        require(CalculateAmount>highestBidAmount,"highesr bid is alredy present");


        biddersData[msg.sender]=CalculateAmount;
        
        highestBidAmount=CalculateAmount;
        
        highestBidder = msg.sender;
    }
    //get contract balance
    function getBidderBid(address _address) public view returns(uint){
      
       return  biddersData[_address];

    }

    function HighestBid() public view returns(uint){
        
        return highestBidAmount;
    
    }


    function HighestBidder() public view returns(address){
       
        return highestBidder;
    
    }



//put endtime

    function putEndTime(uint _endTime) public {

        endTime=_endTime;
    }



    //put endtime



    function endAuction() public{

        if(msg.sender==owner){

            auctionEnded=true;

        }

    }




    //withdwrawbid

    function withdrawBid(address payable _address)public{

        if(biddersData[_address]>0){

            _address.transfer(biddersData[_address]);

        }

    }



}


