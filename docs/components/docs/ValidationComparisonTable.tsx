export function ValidationComparisonTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Validating <i>after</i> interaction
          </th>
          <th>
            Validating <i>before</i> interaction
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div style={{ maxWidth: 300 }}>
              <video
                id="lazy"
                controls
                src="/assets/lazy-mint.mp4"
                style={{ width: 300, paddingBottom: 8 }}
              />
              <label htmlFor="lazy" style={{ fontSize: '14px' }}>
                The user will see feedback after they click "Mint".
              </label>
            </div>
          </td>
          <td>
            <div style={{ maxWidth: 300 }}>
              <video
                id="eager"
                controls
                src="/assets/eager-mint.mp4"
                style={{ width: 300, paddingBottom: 8 }}
              />
              <label htmlFor="eager" style={{ fontSize: '14px' }}>
                The user will eagerly see feedback when they focus out of the
                input.
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
