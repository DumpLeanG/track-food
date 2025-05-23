  <h1>Track-Food: Персональный трекер питания</h1>
  <p><strong>Next.js | React | SCSS | FatSecret API | Supabase | Chart.js</strong></p>
  <h2>📌 О проекте</h2>
  <p><strong>Track-Food</strong> — это веб-приложение для учета потребления калорий и БЖУ. Интегрировано с <strong>FatSecret Platform API</strong> для базы продуктов и <strong>Supabase</strong> для хранения пользовательских данных.</p>
  <h3>🔥 Возможности</h3>
  <ul>
      <li>📊 <strong>Учет калорий и БЖУ</strong> на основе данных FatSecret.</li>
      <li>📅 <strong>Дневник питания</strong> с разбивкой по приемам пищи (завтрак, обед, ужин, перекус).</li>
      <li>🔍 <strong>Поиск продуктов</strong> по базе FatSecret.</li>
      <li>📱 <strong>Адаптивный интерфейс</strong> (десктоп, планшеты, смартфоны).</li>
      <li>🔐 <strong>Авторизация</strong> через Supabase Auth.</li>
  </ul>
  <h2>🛠 Технологии</h2>
  <table>
      <tr>
          <th>Технология</th>
          <th>Назначение</th>
      </tr>
      <tr>
          <td><strong>Next.js 14</strong></td>
          <td>Фронтенд с SSR и API-роутами</td>
      </tr>
      <tr>
          <td><strong>React 18</strong></td>
          <td>UI-компоненты и хуки</td>
      </tr>
      <tr>
          <td><strong>SCSS</strong></td>
          <td>Стили с модульной структурой</td>
      </tr>
      <tr>
          <td><strong>FatSecret API</strong></td>
          <td>База продуктов и расчет нутриентов</td>
      </tr>
      <tr>
          <td><strong>Supabase</strong></td>
          <td>БД пользователей, аутентификация</td>
      </tr>
  </table>
  <h2>🚀 Запуск проекта</h2>
  <h3>1. Установка зависимостей</h3>
  <pre><code>npm install
# или
pnpm install</code></pre>
  <h3>2. Регистрация на сайте Fatsecret API</h3>
  <p>Перейдите по ссылке и зарегистрируйтесь на сайте API, чтобы получить CLIENT_ID и CLIENT_SECRET, а также добавить свой IP-адрес в вайт-лист: <a href="https://platform.fatsecret.com/register">https://platform.fatsecret.com/register</a></p>
  <h3>3. Настройка переменных окружения</h3>
  <p>Создайте файл <code>.env.local</code> в корне проекта:</p>
  <pre># Supabase  
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key 
# FatsecretAPI
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret</pre>
  <h3>4. Запуск dev-сервера</h3>
  <pre><code>npm run dev
# или
pnpm run dev</code></pre>
  <p>Откройте <a href="http://localhost:3000">http://localhost:3000</a>.</p>
  <h2>🌟 Интеграции</h2>
  <h3>🔗 FatSecret API</h3>
  <p>Используется для поиска продуктов и расчета нутриентов.</p>
  <p>Пример запроса:</p>
  <pre><code>async function searchFood(query) {
  const res = await fetch(`/api/fatsecret?query=${query}`);
  return res.json();
}</code></pre>
  <h3>🔥 Supabase</h3>
  <p><strong>Auth</strong>: Регистрация, вход, восстановление пароля.<br>
  <strong>DB</strong>: Хранение дневников питания и пользовательских метрик.</p>
  <pre><code>const { data: user } = await supabase.auth.getUser();</code></pre>
  <h2>🤝 Контакты</h2>
  <div>
    <p>По вопросам сотрудничества: <a href="mailto:mihail.chinenov@mail.ru">mihail.chinenov@mail.ru</a><br>
    GitHub: <a href="https://github.com/DumpLeanG">https://github.com/DumpLeanG</a></p>
  </div>
  <p><span>🎯</span> <strong>Цель проекта:</strong> Помочь пользователям контролировать рацион через простой и удобный интерфейс.</p>

 <p>Ознакомиться можно по ссылке: <a href="https://track-food-nine.vercel.app/">https://track-food-nine.vercel.app/</a><p>
