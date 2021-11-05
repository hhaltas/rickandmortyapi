import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import Axios from 'axios';
import * as HTTPAPI from '../api/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rickmorty_characterid_action from '../redux/actions/character/rickmorty_characterid_action';
import * as rickmorty_episodeid_action from '../redux/actions/episode/rickmorty_episodeid_action';
import * as HttpApi from '../api/api';
import GridItem from '../component/GridItem';
import Subtitle from './Subtitle';


class FlatlistEpisodeCharacter extends Component {
    state = {
        text: '',
        page: 1,
        data: [],
        allContacts: [],
        loading: true,
        refreshing: false,
        navigation: this.props.navigation,
        episode: '',
        characterdata: []
    };

    componentDidMount() {
        this.getContacts();
    }

    getContacts = async () => {
        await Axios.get('https://rickandmortyapi.com/api/episode/1')
            .then((response) => {
                this.setState({ loaded: true, data: response.data.characters });
            })
            .catch((error) => {
                // console.log(error)
            });

    };





    renderContactsItem = ({ item, index }) => {
        Axios.get(item).then((response) => {
            this.setState({ characterdata: response.data })
        }).catch((error) => {
            Alert('Hata')
        })
        return (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: index % 2 === 1 ? '#fafafa' : '' }]}
                onPress={() =>
                    this.__OnPress(item.id)
                }
            >
                <Image
                    style={[styles.avatar, { resizeMode: 'contain' }]}
                    source={{ uri: this.state.characterdata.image }} />
                <Text>{this.state.characterdata.name}</Text>
            </TouchableOpacity>
        )

    };

    __OnPress(item, controlindex) {
        this.props.onCallBack(item, controlindex);
    }



    render() {
        return (
            <View>
                <FlatList
                    renderItem={(item) => (
                        <GridItem onPress={() => this.handleCharacterClick(item.item)} data={item} navigation={this.props.navigation}/> 
                        )}
                    keyExtractor={(item, index) => index}
                    data={this.state.data}
                    onMomentumScrollBegin={() => { this.duringMomentum = false }}
                />
            </View>

        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
        marginHorizontal: 10
    },
    textContainer: {
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 16
    },
    searchContainer: {
        padding: 10
    },
    searchInput: {
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        padding: 10
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

export default connect(mapStateToProps, mapDispatcToProps)(FlatlistEpisodeCharacter);

