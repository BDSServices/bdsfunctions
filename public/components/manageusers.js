
export class BDSManageUsers extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <h3>BDS Users</h3>
        `;
    }
    connectedCallback() {
    }
}
window.customElements.define("bds-manage-users", BDSManageUsers);
