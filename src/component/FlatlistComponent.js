import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as HTTPAPI from '../api/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rickmorty_characterid_action from '../redux/actions/character/rickmorty_characterid_action';
import * as rickmorty_episodeid_action from '../redux/actions/episode/rickmorty_episodeid_action';

class FlatListExample extends Component {
    state = {
        text: '',
        page: 1,
        contacts: [],
        allContacts: [],
        loading: true,
        refreshing: false,
        navigation: this.props.navigation,
        episode: '',
    };

    componentDidMount() {
        this.getContacts();
    }

    getContacts = async () => {
        this.setState({
            loading: true,
        });
        const { data: { results: contacts } } = await axios.get(HTTPAPI.API);


        const users = [...this.state.allContacts, ...contacts];

        if (this.state.refreshing) {
            users.reverse();
        }

        this.setState({
            contacts: users,
            allContacts: users,
            loading: false,
            refreshing: false
        });
    };





    renderContactsItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: index % 2 === 1 ? '#fafafa' : '' }]}
                onPress={() =>
                    this.__OnPress(item.id)
                }
            >
                <Image
                    style={styles.avatar}
                    source={require('../image/rckmrty.jpg')} />
                <View style={{ marginTop: 10 }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.episode} </Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.name} </Text>

                    </View>
                </View>

            </TouchableOpacity>
        )
    };

    __OnPress(item, controlindex) {

        this.props.onCallBack(item, controlindex);

    }
    loadMore = () => {
        if (!this.duringMomentum) {
            this.setState({
                page: this.state.page,
            }, () => {
                this.getContacts();
            });
            this.duringMomentum = true;
        }
    };


    render() {
        return (
            <View>
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    renderItem={this.renderContactsItem}
                    keyExtractor={(item, index) => index}
                    data={this.state.contacts}
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
        width: 50,
        height: 50,
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

export default connect(mapStateToProps, mapDispatcToProps)(FlatListExample);

