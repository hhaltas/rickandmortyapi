import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import Axios from 'axios';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rickmorty_characterid_action from '../redux/actions/character/rickmorty_characterid_action';
import * as rickmorty_episodeid_action from '../redux/actions/episode/rickmorty_episodeid_action';


class GridItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            count: [],
            CharacterName: "a",
            navigation: this.props.navigation,
            api: this.props.data,
            data: []
        };
    }
    componentDidMount() {
        this.__getData();
    }

    async __getData() {
        await Axios.get(this.props.data.item).then((response) => {
            this.setState({ data: response.data, loaded: true })
        }).catch((error) => {
            console.log(error)
        })



    }
    __OnPress(id) {
        this.props.actions.characterID(id);
        this.props.navigation.navigate({
            name: 'Character',
            merge: true
        });
    }
    render() {
        const { loaded } = this.state;
        if (loaded) {
            return (
                <TouchableOpacity style={styles.itemContainer}
                    onPress={() =>
                        this.__OnPress(this.state.data.id)
                    }
                >
                    <Image
                        style={styles.avatar}
                        source={{ uri: this.state.data.image }} />
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{this.state.data.name} </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            );
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


export default connect(mapStateToProps, mapDispatcToProps)(GridItem);

