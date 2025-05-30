import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [id, setId] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovie = async () => {
    setLoading(true);
    setMovie(null);

    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=7b62fa5d`);
      
      // Simular retardo de 3 segundos
      setTimeout(() => {
        setMovie(response.data);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar película por IMDb ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: tt0317219"
        value={id}
        onChangeText={setId}
      />
      <Button title="Buscar" onPress={fetchMovie} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {movie && movie.Response === 'True' && (
        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>{movie.Title}</Text>
          {movie.Poster && (
            <Image source={{ uri: movie.Poster }} style={styles.poster} />
          )}
          <Text style={styles.label}>Actores: <Text style={styles.info}>{movie.Actors}</Text></Text>
          <Text style={styles.label}>Director: <Text style={styles.info}>{movie.Director}</Text></Text>
          <Text style={styles.label}>Género: <Text style={styles.info}>{movie.Genre}</Text></Text>

          <Text style={styles.label}>Ratings:</Text>
          {movie.Ratings && movie.Ratings.map((rating, index) => (
            <Text key={index} style={styles.info}>• {rating.Source}: {rating.Value}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  movieContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  poster: {
    width: 300,
    height: 450,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  info: {
    fontWeight: 'normal',
    fontSize: 15,
  }
});
