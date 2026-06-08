# Contributing to RideDGK

Thank you for your interest in contributing to the RideDGK project! We welcome contributions from the community. Please take a moment to review this document before submitting your contribution.

## Code of Conduct

Please be respectful and constructive in all interactions with other contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/RideDGK/RideDGK/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description of the bug
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots (if applicable)
   - Your environment (browser, OS, etc.)

### Suggesting Enhancements

1. Check if the feature has already been suggested
2. Create a new issue with:
   - Clear, descriptive title
   - Detailed description of the feature
   - Use cases and benefits
   - Possible implementation approach (optional)

### Submitting Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/RideDGK.git
   cd RideDGK
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Keep changes focused and atomic
   - Add comments for complex logic

4. **Test your changes**
   - Test in multiple browsers (Chrome, Firefox, Safari)
   - Test on mobile devices
   - Verify no console errors

5. **Commit your changes**
   ```bash
   git commit -m "feat: Add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Clear description of changes
   - Reference related issues
   - Screenshots for UI changes

## Commit Message Guidelines

Use the following format for commit messages:

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect code meaning
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Code change that improves performance
- `test:` Adding missing tests

**Example:**
```
feat: Add real-time ride tracking
- Implements WebSocket connection for live driver location
- Updates UI with driver position every 5 seconds
- Fixes #123
```

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces for HTML, CSS)
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for non-obvious logic

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Testing
- Test all features manually
- Test on different screen sizes
- Verify responsive design

## Questions?

Feel free to open an issue or reach out to the maintainers for questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to RideDGK! 🚀