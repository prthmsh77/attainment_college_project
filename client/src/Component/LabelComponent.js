import './LabelComponent.css'

export default function LabelComponent({headline}){
    return(
        <label for="inp" class="inp">
                        <input type="text" id="inp" placeholder="&nbsp;"></input>
                            <span class="label">{headline}</span>
                            <span class="focus-bg"></span>
                    </label>
    );
}