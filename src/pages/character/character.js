
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios'
import * as HttpApi from '../../api/api';
//REDUX
import * as rickmorty_characterid_action from '../../redux/actions/character/rickmorty_characterid_action';
import * as rickmorty_episodeid_action from '../../redux/actions/episode/rickmorty_episodeid_action';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            character: [],
            navigation: this.props.navigation
        };
    }
    componentDidMount() {
        this.__GetCharacterRickMorty();
    }
    async __GetCharacterRickMorty() {
        await Axios.get(HttpApi.CAPI + this.props.characterID)
            .then((response) => {
                this.setState({ character: response.data })
                console.log(this.state.character)
            })
            .catch((error) => {
                console.log(error)
            });

    }
    render() {
        const { character } = this.state;
        return (
            <View style={{ flex: 1,paddingTop:10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: character.image }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18 }}>Name</Text>
                            <Text style={{ fontSize: 18 }}>Species</Text>
                            <Text style={{ fontSize: 18 }}>Gender</Text>
                            <Text style={{ fontSize: 18 }}>Type</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18 }}> : </Text>
                            <Text style={{ fontSize: 18 }}> : </Text>
                            <Text style={{ fontSize: 18 }}> : </Text>
                            <Text style={{ fontSize: 18 }}> : </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18 }}>{character.name}</Text>
                            <Text style={{ fontSize: 18 }}>{character.species}</Text>
                            <Text style={{ fontSize: 18 }}>{character.gender}</Text>
                            <Text style={{ fontSize: 18 }}>{character.type}</Text>
                        </View>


                    </View>

                </View>


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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
        marginHorizontal: 10
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

const mapStateToProps = (state) => {
    return {
        episodeID: state.episodeidReducer,
        characterID: state.characteridReducer
    };
};

export default connect(mapStateToProps, mapDispatcToProps)(Character);

