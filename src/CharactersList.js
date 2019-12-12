import React, {Component} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ListItemCard from './CharacterListItem';
import * as MarvelApi from './service';

class CharactersList extends React.Component {
  state = {
    isLoading: true,
    characters: [],
    offset: 0,
  };

  componentDidMount() {
    this._fetchCharacters();
  }

  _fetchCharacters() {
    this.setState({isLoading: true});
    MarvelApi.fetchCharacters(this.state.offset).then(charactersData => {
      const results = charactersData.data.results;
      this.setState({
        characters:
          this.state.offset === 0
            ? results
            : [...this.state.characters, ...results],
        isLoading: false,
        offset: this.state.offset + this.state.characters.length,
      });
    });
  }

  _handleLoadMore = () => {
    if (!this.state.isLoading) {
      this._fetchCharacters();
    }
  };

  _renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _removeCharacter = id => {
    // this.setState({
    //   characters: this.filterCharacters(this.state.characters, id),
    // });
  };

  filterCharacters(array, id) {
    return array.filter(item => item.id !== id);
  }

  sortCharacters(array, compareFn) {
    return array.sort(compareFn);
  }

  render() {
    return (
      <FlatList
        data={this.state.characters}
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        onEndReached={this._handleLoadMore}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.4}
        renderItem={({item}) => (
          <ListItemCard detail={item} onRemoveItem={this._removeCharacter} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
});

export default CharactersList;