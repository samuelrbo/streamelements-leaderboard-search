async function mockStreamElementsDOM(page) {
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <aside id="sidebar-id">
          <ul id="details-id">
            <li>Existing Detail</li>
          </ul>
        </aside>

        <div id="grand-grand-parent">
          <div id="grand-parent">
            <div id="parent">
              <div id="wrapper">
                <div data-slot="card-content">
                  <table class="w-full">
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span class="text-sm text-white font-medium">samzuka</span>
        <div class="mt-4 flex flex-col">
          <p>Earn points every 5 minutes</p>
        </div>
      </body>
    </html>
  `); // Removido o segundo argumento de timeout/networkidle
}
module.exports = { mockStreamElementsDOM };