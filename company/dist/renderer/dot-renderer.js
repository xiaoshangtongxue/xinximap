import { LetterSymbol } from "../symbol/symbol";
/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
/*export class DotRenderer {
    /**
     * 半径字段
     * @remarks
     * 数值字段
     */
/*    _field: Field;

    get field(): Field {
        return this._field;
    }
    set field(value: Field) {
        this._field = value;
    }

    getSymbol(feature: Feature): Symbol {
    
        const symbol=new LetterSymbol();
        symbol.radius=12;
        symbol.letter="C";
        symbol.fontColor="#ffffff";
        symbol.fontSize=12;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#ff0000";
        symbol.radius =symbol.radius+Number(feature.properties[this.field.company_radius] || 0)*3;
        return symbol;
    }

  /*  getSymbol(feature: Feature): Symbol {
     // const symbol = new SimplePointSymbol();
        
     /*   if(feature.properties[this.field.company_radius]==1)
        {
            const symbol=new LetterSymbol();
            const  symbol1=new SimpleTextSymbol();
            symbol1.pointSymbolWidth=35;
            symbol1.pointSymbolHeight=35;
            symbol1.strokeStyle="#ffffff";
            symbol.radius=12;
            symbol.letter="C";
            symbol.fontColor="#ffffff";
            symbol.fontSize=12;
            symbol.strokeStyle = "#ffffff";
            symbol.fillStyle = "#ff0000";
            return symbol;
        }
       else if(feature.properties[this.field.company_radius]==2)
        {
            const symbol=new LetterSymbol();
            const  symbol1=new SimpleTextSymbol();
            symbol1.pointSymbolWidth=35;
            symbol1.pointSymbolHeight=35;
            symbol1.strokeStyle="#5ebfe2";
            symbol.radius=12;
            symbol.letter="C";
            symbol.fontColor="#ffffff";
            symbol.fontSize=12;
            symbol.strokeStyle = "#ffffff";
            symbol.fillStyle = "#5ebfe2";
            return symbol;
        }
       else if(feature.properties[this.field.company_radius]==3)
        {
            const symbol=new LetterSymbol();
            const  symbol1=new SimpleTextSymbol();
            symbol1.pointSymbolWidth=35;
            symbol1.pointSymbolHeight=35;
            symbol1.strokeStyle="#5ebfe2";
            symbol.radius=12;
            symbol.letter="C";
            symbol.fontColor="#ffffff";
            symbol.fontSize=12;
            symbol.strokeStyle = "#ffffff";
            symbol.fillStyle = "#5ebfe2";
            return symbol;
        }*/
/*        const symbol=new LetterSymbol();
        symbol.radius=12;
        symbol.letter="C";
        symbol.fontColor="#ffffff";
        symbol.fontSize=12;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#ff0000";
    
        symbol.radius =symbol.radius+Number(feature.properties[this.field.company_radius] || 0)*3;
 
        return symbol;
}
*/
/*}*/
export class DotRenderer1 {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        const symbol = new LetterSymbol();
        symbol.radius = 12;
        symbol.letter = "果";
        symbol.fontColor = "#ffffff";
        symbol.fontSize = 14;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#ff0000";
        symbol.radius = 13;
        return symbol;
    }
}
export class DotRenderer2 {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        const symbol = new LetterSymbol();
        symbol.radius = 12;
        symbol.letter = "企";
        symbol.fontColor = "#ffffff";
        symbol.fontSize = 14;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#5ebfe2";
        symbol.radius = symbol.radius + Number(feature.properties[this.field.radius] || 0) * 3;
        return symbol;
    }
}
export class DotRenderer3 {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        const symbol = new LetterSymbol();
        symbol.radius = 12;
        symbol.letter = "仪";
        symbol.fontColor = "#ffffff";
        symbol.fontSize = 14;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#ff0000";
        symbol.radius = 13;
        return symbol;
    }
}
export class DotRenderer4 {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        const symbol = new LetterSymbol();
        symbol.radius = 12;
        symbol.letter = "项";
        symbol.fontColor = "#ffffff";
        symbol.fontSize = 14;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#ff0000";
        symbol.radius = 13;
        return symbol;
    }
}
export class DotRenderer5 {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        const symbol = new LetterSymbol();
        symbol.radius = 12;
        symbol.letter = "才";
        symbol.fontColor = "#ffffff";
        symbol.fontSize = 14;
        symbol.strokeStyle = "#ffffff";
        symbol.fillStyle = "#ff0000";
        symbol.radius = symbol.radius + Number(feature.properties[this.field.radius] || 0) * 3;
        return symbol;
    }
}
