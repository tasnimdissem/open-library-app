# 📚 IHEC Library - Online Bookstore

An Angular-based e-commerce platform for browsing, searching, and purchasing books from the Open Library API.

![Angular](https://img.shields.io/badge/Angular-20.3.4-red)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 Live Demo
**[Visit IHEC Library](https://tasnimdissem.github.io/open-library-app/)**

## ✨ Features

### 🔍 Search & Browse
- Browse computer science books from Open Library
- Real-time search by title
- Search by publication year
- Display book details with covers, descriptions, and metadata

### 🛒 Shopping Cart
- Add books to cart with automatic pricing ($19.99 per book)
- Adjust quantities with +/- controls
- Remove individual items or clear entire cart
- Price breakdown with subtotal, tax (8%), and shipping ($5.00)
- Cart count badge in header
- localStorage persistence

### ❤️ Wishlist
- Save favorite books for later
- Track when each book was added
- Add to cart from wishlist
- Wishlist count badge in header
- localStorage persistence

### 🎨 Modern UI/UX
- IHEC branding with custom logo
- Dark blue gradient theme (#151f57)
- Responsive design for mobile and desktop
- Smooth animations and hover effects
- Empty state messages
- Real-time badge updates

## 🚀 Quick Start

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.

## Development server

To start a local development server, run:
### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/tasnimdissem/open-library-app.git
cd open-library-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 📁 Project Structure

```
src/app/
├── services/
│   ├── book.service.ts       # Book data and search
│   ├── cart.service.ts       # Shopping cart management
│   └── wishlist.service.ts   # Wishlist management
├── components/
│   ├── head-bar/             # Header with navigation
│   ├── search-bar/           # Search interface
│   ├── book-list/            # Book grid display
│   ├── book-details/         # Individual book page
│   ├── shopping-cart/        # Cart page
│   └── wishlist/             # Wishlist page
└── app.routes.ts             # Application routing
```

## 🛠️ Technologies

- **Framework:** Angular 20.3.4
- **Language:** TypeScript
- **State Management:** RxJS BehaviorSubject
- **Storage:** localStorage API
- **API:** Open Library API
- **Deployment:** GitHub Pages
- **Build Tool:** Angular CLI

## 🎯 Routes

- `/` - Home (Book List)
- `/book/:id` - Book Details
- `/cart` - Shopping Cart
- `/wishlist` - Wishlist

## 💻 Development

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## 🚀 Deployment

This project is deployed to GitHub Pages using `angular-cli-ghpages`:

```bash
ng build --base-href "/open-library-app/"
npx angular-cli-ghpages --dir=dist/open-library-app/browser
```

## 📝 Features Documentation

For detailed information about e-commerce features, see [E-COMMERCE-FEATURES.md](E-COMMERCE-FEATURES.md)

## 🎓 Project Information

- **Institution:** IHEC (Institut des Hautes Études Commerciales)
- **Course:** Angular 3BI
- **Developer:** Tasnim Dissem
- **Goal:** Obtenir la meilleure note! 🌟

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Application:** https://tasnimdissem.github.io/open-library-app/
- **GitHub Repository:** https://github.com/tasnimdissem/open-library-app
- **Open Library API:** https://openlibrary.org/developers/api

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

