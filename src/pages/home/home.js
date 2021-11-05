import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import FlatListEpisode from '../../component/FlatlistComponent';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rickmorty_characterid_action from '../../redux/actions/character/rickmorty_characterid_action';
import * as rickmorty_episodeid_action from '../../redux/actions/episode/rickmorty_episodeid_action';


const Item = ({ name, episode, id }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{id} - {name} - {episode}</Text>
    </View>
);
const renderItemView = ({ item }) => (
    <Item title={item.title} />
);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            count: [],
            CharacterName: "a",
            navigation: this.props.navigation
        };
    }
    componentDidMount() {
        this.__GetCharacterRickMorty();
    }
    __GetCharacterRickMorty() {
        Axios.get('https://rickandmortyapi.com/api/episode')
            .then((response) => {
                this.setState({ loaded: true, count: response.data.results });
            })
            .catch((error) => {
                // console.log(error)
            });
    }
    onCallBack(id) {
        this.props.actions.episodeID(id);
        this.props.navigation.navigate({
            name: 'Episode',
            merge: true
        });
    }

    render() {
        const { loaded } = this.state;
        if (loaded) {
            return (
                <View style={{}}>
                    <FlatListEpisode navigation={this.props.navigation} onCallBack={this.onCallBack.bind(this)} api={"home"} />
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
});

function mapDispatcToProps(dispatch) {
    return {
        actions: {
            episodeID: bindActionCreators(rickmorty_episodeid_action.episodeID, dispatch),
            characterID: bindActionCreators(rickmorty_characterid_action.characterID, dispatch),
        }
    };
}
const mapStateToProps = state => {
    return {
        episodeID: state.episodeidReducer,
        characterID: state.characteridReducer
    };
};


export default connect(mapStateToProps, mapDispatcToProps)(Home);

