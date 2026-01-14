import { Component } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  template: `
    <header>
      <div class="logo-container">
        <div class="logo">📚</div>
        <div class="title-group">
          <h1>IHEC Library</h1>
          <p class="subtitle">Book Search Platform for Students</p>
        </div>
      </div>
    </header>
  `,
  styles: [`
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 50px 20px;
      text-align: center;
      margin-bottom: 30px;
      position: relative;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      position: relative;
      z-index: 1;
    }

    .logo {
      font-size: 4rem;
    }

    .title-group {
      text-align: left;
    }

    h1 {
      margin: 0;
      font-size: 3rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .subtitle {
      margin: 8px 0 0 0;
      font-size: 1.05rem;
      opacity: 0.95;
      font-weight: 400;
      letter-spacing: 0.3px;
    }

    @media (max-width: 768px) {
      header {
        padding: 30px 15px;
      }

      .logo-container {
        flex-direction: column;
        gap: 10px;
      }

      .title-group {
        text-align: center;
      }

      .logo {
        font-size: 3rem;
      }

      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeadBarComponent {
}
