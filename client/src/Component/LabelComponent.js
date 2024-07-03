import './LabelComponent.css'

export default function LabelComponent(){
    return(
        <label for="inp" class="inp">
                        <input type="text" id="inp" placeholder="&nbsp;"></input>
                            <span class="label">Marks</span>
                            <span class="focus-bg"></span>
                    </label>
    );
}