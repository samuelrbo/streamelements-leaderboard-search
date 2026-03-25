async function mockStreamElementsDOM(page) {
  await page.setContent(`
    <html>
      <body>
        <aside>
          <ul></ul>
        </aside>

        <div data-slot="card-content">
          <table class="w-full"></table>
        </div>

        <span class="text-sm text-white font-medium">samuelrbo</span>

        <div class="mt-4 flex flex-col">
          <p>Earn points every 5 minutes</p>
        </div>
      </body>
    </html>
  `);
}

module.exports = { mockStreamElementsDOM };
