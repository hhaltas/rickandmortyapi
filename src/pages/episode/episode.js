import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatlistEpisodeCharacter from '../../component/FlatlistEpisodeCharacterComponent';
import * as rickmorty_characterid_action from '../../redux/actions/character/rickmorty_characterid_action';
import * as rickmorty_episodeid_action from '../../redux/actions/episode/rickmorty_episodeid_action';
import * as HttpApi from '../../api/api'


class EpisodePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            count: [],
            data: [],
            navigation: this.props.navigation
        };
    }
    componentDidMount() {
        this.__getCharacterList();
    }
    async __getCharacterList() {
        await Axios.get(HttpApi.API + "/" + this.props.episodeID)
            .then((response) => {
                this.setState({ loaded: true, count: response.data.results, data: response.data });
            })
            .catch((error) => {
                // console.log(error)
            }
            )
    }
    onCallBack(id) {
        this.props.actions.characterID = id;
        this.props.navigation.navigate({
            name: 'Character',
            merge: true
        });

    }
    render() {
        const { loaded, data } = this.state;
        if (loaded) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatlistEpisodeCharacter navigation={this.props.navigation} onCallBack={this.onCallBack.bind(this)} api={"home"} />
                </View >);
        }
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        flex: 1,
        fontSize: 20,
    }
});



function mapDispatcToProps(dispatch) {
    return {
        actions: {
            episodeID: bindActionCreators(rickmorty_episodeid_action.episodeID, dispatch),
            characterID: bindActionCreators(rickmorty_characterid_action.characterID, dispatch),
        }
    };
}

const mapStateToProps = (state) => {
    return {
        episodeID: state.episodeidReducer,
        characterID: state.characteridReducer
    };
};

export default connect(mapStateToProps, mapDispatcToProps)(EpisodePage);

