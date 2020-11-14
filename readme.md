## Digit Recognition

Web application that recognizes hand-drawn digits

Uses a custom from-scratch neural net written in Rust and compiled to WebAssembly

## Updating model and development

(all snippets start in root of repo)

1. Build wasm for node

```bash
cd ./rust-neural-network
wasm-pack build --target node
```

2. Unpack data

```bash
cd ./trainer
unzip ./mnist.zip
```

3. Train model

```bash
cd ./trainer
yarn train
```

4. Copy model to web app

```bash
cp ./trainer/model.json ./frontend/public
```

5. Build wasm for browser

```bash
cd ./rust-neural-network
wasm-pack build
```

6. Start website

```bash
cd ./frontend
yarn install
yarn serve
```
