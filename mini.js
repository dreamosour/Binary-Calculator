function toBinary(dec, ch){
    var i=0;
    if(dec<0) dec = dec * -1;
    if (ch=="q"){
        while (dec != 0){
            Q[i] = dec % 2;
            dec = dec / 2;
            dec = parseInt(dec);
            i++;
        }
        return i-1;
    }
    else{
        while (dec != 0){
            M[i] = dec % 2;
            dec = dec / 2;
            dec = parseInt(dec);
            i++;
        }
        return i-1;
    }
}


function ones_comp(i, ch) {
    var k = 0;
    if (ch == "q") {
        while (k <= i) {
            Q[k] = Q[k] == 0 ? 1 : 0;
            k++;
        }
    }
    else {
        while (k <= i) {
            M[k] = M[k] == 0 ? 1 : 0;
            k++;
        }
    }
}


function twos_comp(i, ch){
    var k;
    if (ch == "q") {
        for (
            k = 0;
            k <= i;
            k++
        ) {
            if (Q[k] == 1) Q[k] = 0;
            else {
                Q[k] = 1;
                break;
            }
        }
    }
    else {
        for (
            k = 0;
            k <= 1;
            k++
        ) 
        {
            if (M[k] == 1) M[k] = 0;
            else {
                M[k] = 1;
                break;
            }
        }
    }
}


function main(q, m) {
    q= parseInt(q);
    m= parseInt(m);
    createli("Multiplicand :",q);
    createli("Multiplier:",m );
    var index = generateQ_M_M1(q, m);
    algo(index + 1, index);
}


var Q = new Array(10);
var M = new Array(10);
var M1 = new Array(10);
var A = new Array(10);
var Q_ = 0;
function createli(sentence = null,value="", i = null, ch = null) {
   if (i != null) value = print(i, ch);
   sentence = sentence + " " + value; 
   var node = document.createElement("LI");
   var textnode = document.createTextNode(sentence);
   node.appendChild(textnode);
   document.getElementById("mylist").appendChild(node);
}


function generateQ_M_M1(q, m) {
    var q_sign = q >= 0 ? 0 : 1;
    var m_sign = m >= 0 ? 0 : 1;
    var m1_sign = m_sign == 0 ? 1: 0;
    var iq = toBinary(q, "q");
    createli ("binary value of Q is", value="",i=iq,ch='q')
    var im = toBinary(m, "m");
    createli ("binary value of M is",value="",i=im,ch='m')
    if(q<0) {
        ones_comp(iq, "q");
        twos_comp(iq, "q");
        Q[++iq] = q_sign;
    } else Q[++iq] = q_sign;
    if (m<0) {
        ones_comp(im, "m");
        twos_comp(im, "m");
        M[++im] = m_sign;
    } else M[++im] = m_sign;

    iq = im = bit_checker(iq, im, q_sign, m_sign);

    var im1 = generate_m1 (im);
    M1[++im1] = m1_sign;
    Q[++iq] = q_sign;
    M[++im] = m_sign;

    var a = iq;
    for (var i = 0; i<=a; ++i) A[i] = 0;

    createli("final values are:");
    createli("Q=","",iq,'q')
    createli("M=","",im,'m')
    createli("-M=","",iq,'m1')
    createli("A=","",iq,'a')
    return iq;
}


function print(i, ch) {
    var qbin = "";
    var mbin = "";
    var abin = "";
    var m1bin = "";
    if(ch == "q") {
        while (i >= 0) qbin += Q[i--];
        return qbin;
    } else if ( ch == "m") {
        while (i >= 0) mbin += M[i--];
        return mbin;
    }
}


function bit_checker(q, m, q_sign, m_sign) {
    while (q != m) {
        if (q > m)
        M[++M] = m_sign;
        else Q[++q] = q_sign;
    }
    return q;
}

function generate_m1(m) {
    var k = m;
    while (k >= 0) {
        M1[k] = M[k];
        k--;
    }
    for (k = 0; k <=m; k++) M1[k] = M1[k] == 0 ? 1 : 0;
    for (k = 0; k <=m; k++) {
        if (M1[k] == 1) M1[k] = 0;
        else {
            M1[k] = 1;
            break;
        }
    }
    return m;
}

function algo(count, index) {
    print_line(count, index, "initial");

    while (count > 0) {
        if (Q[0] == 1 && Q_ == 0) {
            subtraction(index);
            print_line(count, index, "A=A-M");
        } else if (Q[0] == 0 && Q_ == 1) {
            addition(index);
            print_line(count, index, "A=A+M");
        }
        count--;
        shift(index);
        print_line(count, index, "Shift right A,Q,Q_ and count--");
    }
    var ans= print(index, 'a');
    ans+=print(index, 'q');
    createli("final product:",ans);
}

function print_line(count, index, step) {
    var tb1 = document.getElementById("mytable");
    var row = tb1.insertRow();
    var col1 = row.insertCell();
    var col2 = row.insertCell();
    var col3 = row.insertCell();
    var col4 = row.insertCell();
    var col5 = row.insertCell();
    col1.innerHTML = count;
    col2.innerHTML = print(index, "a");
    col3.innerHTML = print(index, "q");
    col4.innerHTML = Q__;
    col5.innerHTML = step;
}

function addition(index) {
    var carry = 0;
    for (var i = 0; i <= index; ++i){
        var temp = parseInt((A[i] + M[i] + carry) % 2);
        carry = parseInt((A[i] + M[i] + carry) / 2);
        A[i] = temp;
    }
}

function subtraction(index) {
    var carry = 0;
    for (var i = 0; i <= index; ++i){
        var temp = parseInt((A[i] + M1[i] + carry) % 2);
        carry = parseInt((A[i] + M1 + carry) / 2);
        A[i] = temp;
    }
}

function shift(index) {
    var i;
    Q_ = Q[0];
    for (i = 0; i < index; ++i) Q[i] = Q[i + 1];
    Q[i] = A[0];
    for (var i = 0; i < index; ++i) A[i] = A[i + 1];
}