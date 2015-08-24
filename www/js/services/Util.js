/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('UtilService',function(){
    
    var names = ['bytes','KB','MB','GB','TB'];
    
    var colors = ['#B0171F', '#DC143C', '#FFB6C1', '#FFAEB9', '#EEA2AD', '#CD8C95', '#8B5F65', '#FFC0CB', '#FFB5C5', '#EEA9B8', '#CD919E', '#8B636C', '#DB7093', '#FF82AB', '#EE799F', '#CD6889', '#8B475D', '#FFF0F5', '#EEE0E5', '#CDC1C5', '#8B8386', '#FF3E96', '#EE3A8C', '#CD3278', '#8B2252', '#FF69B4', '#FF6EB4', '#EE6AA7', '#CD6090', '#8B3A62', '#872657', '#FF1493', '#EE1289', '#CD1076', '#8B0A50', '#FF34B3', '#EE30A7', '#CD2990', '#8B1C62', '#C71585', '#D02090', '#DA70D6', '#FF83FA', '#EE7AE9', '#CD69C9', '#8B4789', '#D8BFD8', '#FFE1FF', '#EED2EE', '#CDB5CD', '#8B7B8B', '#FFBBFF', '#EEAEEE', '#CD96CD', '#8B668B', '#DDA0DD', '#EE82EE', '#FF00FF', '#EE00EE', '#CD00CD', '#8B008B', '#800080', '#BA55D3', '#E066FF', '#D15FEE', '#B452CD', '#7A378B', '#9400D3', '#9932CC', '#BF3EFF', '#B23AEE', '#9A32CD', '#68228B', '#4B0082', '#8A2BE2', '#9B30FF', '#912CEE', '#7D26CD', '#551A8B', '#9370DB', '#AB82FF', '#9F79EE', '#8968CD', '#5D478B', '#483D8B', '#8470FF', '#7B68EE', '#6A5ACD', '#836FFF', '#7A67EE', '#6959CD', '#473C8B', '#F8F8FF', '#E6E6FA', '#0000FF', '#0000EE', '#0000CD', '#00008B', '#000080', '#191970', '#3D59AB', '#4169E1', '#4876FF', '#436EEE', '#3A5FCD', '#27408B', '#6495ED', '#B0C4DE', '#CAE1FF', '#BCD2EE', '#A2B5CD', '#6E7B8B', '#778899', '#708090', '#C6E2FF', '#B9D3EE', '#9FB6CD', '#6C7B8B', '#1E90FF', '#1C86EE', '#1874CD', '#104E8B', '#F0F8FF', '#4682B4', '#63B8FF', '#5CACEE', '#4F94CD', '#36648B', '#87CEFA', '#B0E2FF', '#A4D3EE', '#8DB6CD', '#607B8B', '#87CEFF', '#7EC0EE', '#6CA6CD', '#4A708B', '#87CEEB', '#00BFFF', '#00B2EE', '#009ACD', '#00688B', '#33A1C9', '#ADD8E6', '#BFEFFF', '#B2DFEE', '#9AC0CD', '#68838B', '#B0E0E6', '#98F5FF', '#8EE5EE', '#7AC5CD', '#53868B', '#00F5FF', '#00E5EE', '#00C5CD', '#00868B', '#5F9EA0', '#00CED1', '#F0FFFF', '#E0EEEE', '#C1CDCD', '#838B8B', '#E0FFFF', '#D1EEEE', '#B4CDCD', '#7A8B8B', '#BBFFFF', '#AEEEEE', '#96CDCD', '#668B8B', '#2F4F4F', '#97FFFF', '#8DEEEE', '#79CDCD', '#528B8B', '#00FFFF', '#00EEEE', '#00CDCD', '#008B8B', '#008080', '#48D1CC', '#20B2AA', '#03A89E', '#40E0D0', '#808A87', '#00C78C', '#7FFFD4', '#76EEC6', '#66CDAA', '#458B74', '#00FA9A', '#F5FFFA', '#00FF7F', '#00EE76', '#00CD66', '#008B45', '#3CB371', '#54FF9F', '#4EEE94', '#43CD80', '#2E8B57', '#00C957', '#BDFCC9', '#3D9140', '#F0FFF0', '#E0EEE0', '#C1CDC1', '#838B83', '#8FBC8F', '#C1FFC1', '#B4EEB4', '#9BCD9B', '#698B69', '#98FB98', '#9AFF9A', '#90EE90', '#7CCD7C', '#548B54', '#32CD32', '#228B22', '#00FF00', '#00EE00', '#00CD00', '#008B00', '#008000', '#006400', '#308014', '#7CFC00', '#7FFF00', '#76EE00', '#66CD00', '#458B00', '#ADFF2F', '#CAFF70', '#BCEE68', '#A2CD5A', '#6E8B3D', '#556B2F', '#6B8E23', '#C0FF3E', '#B3EE3A', '#9ACD32', '#698B22', '#FFFFF0', '#EEEEE0', '#CDCDC1', '#8B8B83', '#F5F5DC', '#FFFFE0', '#EEEED1', '#CDCDB4', '#8B8B7A', '#FAFAD2', '#FFFF00', '#EEEE00', '#CDCD00', '#8B8B00', '#808069', '#808000', '#BDB76B', '#FFF68F', '#EEE685', '#CDC673', '#8B864E', '#F0E68C', '#EEE8AA', '#FFFACD', '#EEE9BF', '#CDC9A5', '#8B8970', '#FFEC8B', '#EEDC82', '#CDBE70', '#8B814C', '#E3CF57', '#FFD700', '#EEC900', '#CDAD00', '#8B7500', '#FFF8DC', '#EEE8CD', '#CDC8B1', '#8B8878', '#DAA520', '#FFC125', '#EEB422', '#CD9B1D', '#8B6914', '#B8860B', '#FFB90F', '#EEAD0E', '#CD950C', '#8B6508', '#FFA500', '#EE9A00', '#CD8500', '#8B5A00', '#FFFAF0', '#FDF5E6', '#F5DEB3', '#FFE7BA', '#EED8AE', '#CDBA96', '#8B7E66', '#FFE4B5', '#FFEFD5', '#FFEBCD', '#FFDEAD', '#EECFA1', '#CDB38B', '#8B795E', '#FCE6C9', '#D2B48C', '#9C661F', '#FF9912', '#FAEBD7', '#FFEFDB', '#EEDFCC', '#CDC0B0', '#8B8378', '#DEB887', '#FFD39B', '#EEC591', '#CDAA7D', '#8B7355', '#FFE4C4', '#EED5B7', '#CDB79E', '#8B7D6B', '#E3A869', '#ED9121', '#FF8C00', '#FF7F00', '#EE7600', '#CD6600', '#8B4500', '#FF8000', '#FFA54F', '#EE9A49', '#CD853F', '#8B5A2B', '#FAF0E6', '#FFDAB9', '#EECBAD', '#CDAF95', '#8B7765', '#FFF5EE', '#EEE5DE', '#CDC5BF', '#8B8682', '#F4A460', '#C76114', '#D2691E', '#FF7F24', '#EE7621', '#CD661D', '#8B4513', '#292421', '#FF7D40', '#FF6103', '#8A360F', '#A0522D', '#FF8247', '#EE7942', '#CD6839', '#8B4726', '#FFA07A', '#EE9572', '#CD8162', '#8B5742', '#FF7F50', '#FF4500', '#EE4000', '#CD3700', '#8B2500', '#5E2612', '#E9967A', '#FF8C69', '#EE8262', '#CD7054', '#8B4C39', '#FF7256', '#EE6A50', '#CD5B45', '#8B3E2F', '#8A3324', '#FF6347', '#EE5C42', '#CD4F39', '#8B3626', '#FA8072', '#FFE4E1', '#EED5D2', '#CDB7B5', '#8B7D7B', '#FFFAFA', '#EEE9E9', '#CDC9C9', '#8B8989', '#BC8F8F', '#FFC1C1', '#EEB4B4', '#CD9B9B', '#8B6969', '#F08080', '#CD5C5C', '#FF6A6A', '#EE6363', '#8B3A3A', '#CD5555', '#A52A2A', '#FF4040', '#EE3B3B', '#CD3333', '#8B2323', '#B22222', '#FF3030', '#EE2C2C', '#CD2626', '#8B1A1A', '#FF0000', '#EE0000', '#CD0000', '#8B0000', '#800000', '#8E388E', '#7171C6', '#7D9EC0', '#388E8E', '#71C671', '#8E8E38', '#C5C1AA', '#C67171', '#555555'];

    this.parseStorage = function(bytes){
        
        var indexName = 0;
        
        while(bytes > 1024){
            bytes = bytes / 1024;
            indexName++;
        }
        
        return {
            value:bytes.toFixed(2),
            label:bytes.toFixed(2) + ' ' + names[indexName]
        };
    };

    this.getColor = function(index){
    	return colors[index];
    };

    this.highlight = function(col, amt) {

        var usePound = false;

        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col,16);

        var r = (num >> 16) + amt;

        if (r > 255){
            r = 255;
        }
        else if(r < 0){ 
            r = 0;
        }

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255){
            b = 255;
        }else if  (b < 0){ 
            b = 0;
        }

        var g = (num & 0x0000FF) + amt;

        if (g > 255){ 
            g = 255;
        }
        else if (g < 0){ 
            g = 0; 
        }

        return (usePound?'#':'') + (g | (b << 8) | (r << 16)).toString(16);
    };

    this.getTimeFromSegs = function(segs){

        if(segs < 60){ return segs.toFixed(2) + ' segs';}

        var mins = segs / 60;

        if(mins < 60){ return mins.toFixed(2) + ' mins';}

        var hours = mins / 60;

        if(hours < 24){ return hours.toFixed(2) + ' hrs';}

        var days = hours / 24; 

        if(days < 30){ return days.toFixed(0) + ' days';}

        var months = days / 30;

        if(months < 12){ return months.toFixed(0) + ' months';}

        var years = months / 12;

        return years.toFixed(2) + ' years';
    };

});