export const addContainers = (HELPER) => {
    const landing = HELPER.dom.add(document.body, "div", "landingSection max center")
    landing.innerHTML = `
        <div class="landingBox row_spaceBetween v_center">
            <div class="leftBox column_spaceBetween leftBoxHover">
                    <div class="title level v_center">Level</div>
                    <hr>
                    <span class="title frame v_bottom"></span>

                <ul class="frameInfo row_spaceBetween">
                    <li class="infoBox v_center">Components<span id="infoComponents" class="infoNum relative">0</span></li>
                    <li class="infoBox v_center">Animations<span id="infoAnimations" class="infoNum relative">0</span></li>
                    <li class="infoBox v_center">Helpers<span id="infoHelpers" class="infoNum relative">0</span></li>
                </ul>
            </div>
            <div class="accessBox center relative">
                <div class="progress max"></div>
                <span class="go absolute center">Go</div>
            </div>
        </div>
    `
    return {
        'landingSection': landing,
        'landingBox': document.querySelector(".landingBox"),
        'leftBox': document.querySelector(".leftBox"),
        'frame': document.querySelector(".frame"),
        'accessBox': document.querySelector(".accessBox"),
        'progress': document.querySelector(".progress"),
        'go': document.querySelector(".go")
    }
}
