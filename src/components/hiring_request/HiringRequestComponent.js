import React, { Component } from "react";
import styles from "./HiringRequestComponentStyle";
import Bike from "./BikeComponent";
import BikeSearchComponent from "./BikeSearchComponent";
import _ from "lodash";

class HiringRequestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bikeData: [
                { image: "images/bike.png", price: 23030, address: "Nguyen Huu Dat", owner: "Eric Bui", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 534030, address: "Nguyen Huu Dat", owner: "Vuong Pham", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 15430, address: "Nguyen Huu Dat", owner: "Lay Vo", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 2430, address: "Nguyen Huu Dat", owner: "Tony Tuan", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 6030, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 12540, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 15640, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
                { image: "images/bike.png", price: 17550, address: "Nguyen Huu Dat", owner: "Tomy Ai", manufacturer: "Volata Cycles", snNumber: "2018-BKC-ZbX75728iFp5" },
            ],

            isRenderFilter: true
        };
    }

    onChangeFilter = (value) => {

        this.setState({
            isRenderFilter: value
        });
    }

    _renderBike = (bike) => {
        let renderBike = [];
        
        _.forEach(bike, (value, index) => {
            renderBike.push(<Bike bike={value} key={index} {...this.props} />);
        });

        return renderBike;
    }

    _renderBikeMaps = () => {
        return (
            <div className="col-sm-12">
                <iframe
                    title="Maps"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26081603.294420462!2d-113.6067555!3d37.06250000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1529918312939"
                    style={styles.iframe}
                />
            </div>
        );
    }

    _renderContent = () => {
        if (this.state.isRenderFilter) {
            return this._renderBike(this.state.bikeData);
        }

        return this._renderBikeMaps();
    }

    render() {
        return (
            <div style={styles.wrapp}>
                <BikeSearchComponent
                    isRenderFilter={this.state.isRenderFilter}
                    onChangeFilter={this.onChangeFilter}
                />
                <div className="row">
                    {this._renderContent()}
                </div>
            </div>
        );
    }
}

export default HiringRequestComponent;