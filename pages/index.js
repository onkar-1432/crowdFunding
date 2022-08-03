import React from 'react'
import factory from '../ethereum/factory'
import{Card, Button} from 'semantic-ui-react'
import Layout from '../components/Layout'
import {Link} from '../routes'
//next does not have the support for css
//so add and paste link tag
import 'semantic-ui-css/semantic.min.css'



class CampaignIndex extends React.Component{
  //any data fetching should be inside of component did mount is ok with react
  //but we are using next which uses server side rendering 
  //server side rendering attemps to render component on server and take all html and send tobrowser
  //cache is that if we want to do data fetching next does execute at next server unofortunately next does not execute componentdidMount method on server
  //when our app is rendered by next on server this componentdidMount method does not execute
  //so use getinitalprops fnction
  //static keword define class function
  //we have to create instace to access it 
  //but static keyword this function is assined to class itself not instance
  //why require?
  //next want to retrive data without rendering as it is computationally expensive
  //so by skipping rendering next ablee to make sever side rendering easy

  static async getInitialProps(){
    const campaigns=await factory.methods.getdeployedcamp().call();
    return {campaigns} // object is retuned by it 
  }

  //render components for rendering the card groups
  //each has header and snippet property
  renderCampaigns(){
    const items= this.props.campaigns.map((item)=>{
      return {
        header:item,
        description:(
        <Link route={`/campaigns/${item}`}>
           <a>View Campaign</a>
        </Link>
       
        ),
        fluid:true //group of cards have width constraint that is it cant strech to right hand
        // side of container by fuild =true its going to strech to the far RHS not going to interfere with createcapaign button
      }
    })
    return <Card.Group items={items}/>
  }
  
  // async componentDidMount(){
  //       const campaigns=await factory.methods.getdeployedcamp().call();
  //       console.log(campaigns)
  //   }
    render(){
      //here we can use this.props.campaigns
      return (
       <div>
        <Layout> 
          
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
            <a>
              <Button floated='right' content="Create Campaign" icon="add circle" primary={true}/>  
            </a>
          </Link>
          
          {this.renderCampaigns()}
        </Layout>
        
       </div>
      )
    }
}
export default CampaignIndex;