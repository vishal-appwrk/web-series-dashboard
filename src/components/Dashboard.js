import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import Caption from './Caption';
import KpiData from '../utils/kpiData';
import Kpi from './Kpi';
import Subscribers from './Subscribers';
import Revenue from './Revenue';
import AwardRating from './AwardRating';
import DataSource from '../utils/config';
import FusionGrid from 'fusiongrid';
import { ReactFusionGrid } from "react-fusiongrid";
import saasData from './data';
// import '../node_modules/bulma/css/bulma.css';

ReactFusionGrid.fgRoot(FusionGrid);

// var data = saasData.valueRanges[0].values;
// Netflix: [
//     { id: "Subscribers", value: "539.8M", icon: feed,iconType:"badge is-feed" },
//     { id: "Revenue", value: "12.8B", icon: dollar,iconType:"badge is-dollar", },
//     { id: "Emmy Awards", value: "23", icon: trophy, iconType:"badge is-trophy" },
//     { id: "IMDb Rating", value: "8.34", icon: star,iconType:"badge is-star" }
// ],
// Amazon: [
//     { id: "Subscribers", value: "815M", icon: feed,iconType:"badge is-feed" },
//     { id: "Revenue", value: "20.5B", icon: dollar,iconType:"badge is-dollar" },
//     { id: "Emmy Awards", value: "5", icon: trophy, iconType:"badge is-trophy" },
//     { id: "IMDb Rating", value: "7.58", icon: star,iconType:"badge is-star" }
// ],
// Hulu: [
//     { id: "Subscribers", value: "25M", icon: feed,iconType:"badge is-feed" },
//     { id: "Revenue", value: "2.85B", icon: dollar,iconType:"badge is-dollar" },
//     { id: "Emmy Awards", value: "1", icon: trophy, iconType:"badge is-trophy" },
//     { id: "IMDb Rating", value: "7.07", icon: star,iconType:"badge is-star" }
// ],
// HBO: [
//     { id: "Subscribers", value: "150M", icon: feed,iconType:"badge is-feed" },
//     { id: "Revenue", value: "6B", icon: dollar,iconType:"badge is-dollar" },
//     { id: "Emmy Awards", value: "6", icon: trophy, iconType:"badge is-trophy" },
//     { id: "IMDb Rating", value: "8.04", icon: star,iconType:"badge is-star" }
// ]

var data = [
    ["Netflix", "45M", "6B", "6", "8.04"],
    ["Amazon", "185M", "5B", "5", "3.04"],
    ["Hulu", "90M", "3B", "4", "6.04"],
    ["HBO", "80M", "8B", "3", "9.04"]
];
var schema = [
    {
        name: 'Company' 
    }, 
    {
        name: 'Subscribers'
    },
    {
        name: 'Revenue'
    },
    {
        name: 'Emmy Awards'
    },
    {
        name: 'IMDb Rating'
    }
  ];
var dataStore = new FusionGrid.DataStore();
  var dataTable = dataStore.createDataTable(data, schema, {
      enableIndex: true
  });
  var gridConfig = {}
  function rendered(event){
    console.log('event fired')
  }

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.sub = React.createRef();
        this.rev = React.createRef();
        this.award = React.createRef();
        this.state = {
            menus: [
                { id: "netflix", value: "Netflix", active: true },
                { id: "amazon", value: "Amazon", active: false },
                { id: "hulu", value: "Hulu", active: false },
                { id: "hbo", value: "HBO", active: false }
            ],
            caption: "Netflix",
            kpiData: KpiData.Netflix,
            dataSource: DataSource.Netflix
        }
    }
    menuClick = (id) => {
       
        this.setState({ "caption": id });
        this.setState({ "kpiData": KpiData[id] });
        this.setState({ "dataSource": DataSource[id] })
        this.state.menus.forEach(menu => {

            id === menu.value ? menu.active = true : menu.active = false;
        });
        this.setState({ "menus": this.state.menus });
       
    }
    kpiClick = (id) => {
        if (id === "Subscribers")
            ReactDOM.findDOMNode(this.sub.current).scrollIntoView({ block: 'center',  behavior: 'smooth' });
        else if (id === "Revenue")
            ReactDOM.findDOMNode(this.rev.current).scrollIntoView({ block: 'center', behavior: 'smooth', inline: "nearest" });
        else if (id === "Emmy Awards" || "IMDb Rating")
            ReactDOM.findDOMNode(this.award.current).scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    render() {
        return (
            <div className="dashboard">
                
                <nav className="navbar is-primary is-fixed-top" >
                    <div className="navbar-brand">
                        <div className="is-logo">
                            <h2 className="logo-wrapper">W</h2>
                        </div>
                        <div className="navbar-item">
                            <span className="has-space">
                                <h2 className="caption">Web Series Dashboard</h2>
                            </span>
                        </div>
                    </div>
                    <Menu menus={this.state.menus} handleClick={this.menuClick} />
                </nav >

                <div className="container">
                    <Caption caption={this.state.caption} />
                    <section className="section is-kpi">
                        <span className="has-image">
                            <h3 className="snapshot"> Snapshot 2018</h3>
                        </span>
                        <Kpi cards={this.state.kpiData} handleClick={this.kpiClick} />
                        <hr className="path" />
                    </section>
                    <span className="has-image">
                            <h3 className="snapshot">FusionGrid</h3>
                    </span>
                    <ReactFusionGrid 
                    data={dataTable} 
                    config={gridConfig} 
                    width={1005} 
                    height={250} 
                    fgEvent-rendered={rendered}
                    // onRender={methodCallback}
                />
                    <Subscribers value={this.state.kpiData[0].value} icon={this.state.kpiData[0].icon} datasource={this.state.dataSource} ref={this.sub} />
                    <Revenue value={this.state.kpiData[1].value} icon={this.state.kpiData[1].icon} datasource={this.state.dataSource} ref={this.rev} />
                    <AwardRating awardValue={this.state.kpiData[2].value} awardIcon={this.state.kpiData[2].icon} ratingValue={this.state.kpiData[3].value} ratingIcon={this.state.kpiData[3].icon} datasource={this.state.dataSource} ref={this.award} />
                    <section className="section has-footer">www.fusioncharts.com</section>
                </div>
            </div>
        );
    }
}
export default Dashboard;