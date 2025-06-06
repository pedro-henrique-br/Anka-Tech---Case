<h1 align="center">💼 AnkaTech - Case</h1>

<p align="center">
  <br/>
  <strong>Backend Node.js (Fastify + Prisma) | Frontend em Next.js (Typescript)</strong>
</p>

<hr />

<img src="https://github.com/user-attachments/assets/5e74974e-33b2-40a1-9be9-02ea10329755" />

<h2>🚀 Tecnologias Utilizadas</h2>

<h3>Backend</h3>
<ul>
  <li>Node.js + Fastify</li>
  <li>Prisma ORM</li>
  <li>MySQL</li>
  <li>Docker</li>
</ul>

<h3>Frontend</h3>
<ul>
  <li>Next.js</li>
  <li>TypeScript</li>
  <li>React Query</li>
  <li>Zod + React Hook Form</li>
  <li>ShadCN UI</li>
</ul>

<hr />

<h2>🐳 Como Rodar este projeto com o Docker</h2>

<h3>1. Clonar o projeto</h3>

<pre><code>git clone https://github.com/seu-usuario/ankatech.git
cd ankatech</code></pre>

<h3>2. Configurar variáveis de ambiente do backend</h3>

<p>Crie um arquivo <code>.env</code> dentro da pasta <code>backend/</code> com o seguinte conteúdo:</p>

<pre><code>DATABASE_URL="mysql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"</code></pre>
<pre><code>JWT_SECRET=jwt_seguro</code></pre>

<h3>3. Subir os containers</h3>

<pre><code>docker-compose up --build</code></pre>

<p>O Docker irá subir o banco de dados MySQL na porta <code>3307</code> e o backend na <code>porta 3333</code>, aplicando as migrações automaticamente.</p>

<hr />

<h2>🔧 Rodando o Frontend - Backend</h2>

<ol>
  <li>Vá para a pasta <code>frontend/</code></li>
  <li>Instale as dependências (backend e frontend):
    <pre><code>npm install</code></pre>
  </li> 
  <li>Rode a aplicação (backend e frontend):
    <pre><code>npm run dev</code></pre>
  </li>
</ol>

<p>O frontend estará disponível em: <a href="http://localhost:3000">http://localhost:3000</a></p>

<hr />

<h2>🔌 Endpoints da API</h2>

<p>O backend estará disponível em: <code>http://localhost:3333</code></p>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>GET</td><td>/customers</td><td>Lista todos os clientes</td></tr>
    <tr><td>POST</td><td>/customers</td><td>Cria um novo cliente</td></tr>
    <tr><td>PUT</td><td>/customers/:id</td><td>Edita um cliente</td></tr>
    <tr><td>DELETE</td><td>/customers/:id</td><td>Deleta um cliente</td></tr>
    <tr><td>GET</td><td>/assets</td><td>Lista todos os ativos</td></tr>
    <tr><td>POST</td><td>/assets</td><td>Cria um novo ativo</td></tr>
    <tr><td>GET</td><td>/assets/:customerId</td><td>Ativos por cliente</td></tr>
  </tbody>
</table>

<hr />

<h2>🧪 Banco de Dados (Mysql)</h2>

<ul>
  <li>Porta: <code>3307</code></li>
  <li>Usuário: <code>root</code></li>
  <li>Senha: <code>root</code></li>
  <li>Banco: <code>investment_db</code></li>
</ul>

<hr />

<h2>📦 Estrutura</h2>

<pre><code>.
├── backend/
│   ├── src/
│   ├── prisma/
│   └── .env
│   └── docker-compose.yml
├── frontend/
    └── ...

</code></pre>

<hr />

<h2>🧑‍💼 Autor</h2>

<p>Desenvolvido por <a href="[https://github.com/seu-usuario](https://github.com/pedro-henrique-br)" target="_blank">Pedro Henrique</a></p>

<hr />
