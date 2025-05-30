const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sample data (in a real app, this would come from a database)
const articles = [
  {
    id: 1,
    title: "Kenya's Green Energy Revolution",
    category: "Renewable Energy",
    excerpt: "How Kenya is leading East Africa in renewable energy adoption.",
    content: "Full article content would go here...",
    image: "solar-farm.jpg",
    date: "2023-10-15"
  },
  {
    id: 2,
    title: "Protecting the Maasai Mara Ecosystem",
    category: "Biodiversity & Wildlife",
    excerpt: "New conservation efforts show promise for Kenya's iconic wildlife.",
    content: "Full article content would go here...",
    image: "wildlife-conservation.jpg",
    date: "2023-10-10"
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home', 
    featuredArticles: articles.slice(0, 3),
    latestArticles: articles
  });
});

app.get('/news', (req, res) => {
  res.render('news', { 
    title: 'News', 
    articles: articles 
  });
});

app.get('/climate-change', (req, res) => {
  res.render('climate', { 
    title: 'Climate Change',
    articles: articles.filter(article => article.category === 'Climate Change')
  });
});

app.get('/renewable-energy', (req, res) => {
  res.render('renewable', { 
    title: 'Renewable Energy',
    articles: articles.filter(article => article.category === 'Renewable Energy')
  });
});

app.get('/biodiversity-wildlife', (req, res) => {
  res.render('biodiversity', { 
    title: 'Biodiversity & Wildlife',
    articles: articles.filter(article => article.category === 'Biodiversity & Wildlife')
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.get('/article/:id', (req, res) => {
  const article = articles.find(article => article.id === parseInt(req.params.id));
  if (article) {
    res.render('article', { 
      title: article.title,
      article: article
    });
  } else {
    res.status(404).send('Article not found');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});