var RGBA_RE = new RegExp(/\s*rgba\s*\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*,\s*([01]{0,1}.{0,1}\d*)\s*\)\s*/);
function Color(red, green, blue, alpha) {
	if (typeof red !== 'number' || typeof red !== 'number' || typeof red !== 'number' || typeof alpha !== 'number' ||
		red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || alpha < 0 || alpha > 1.0) {
		throw 'Color(red: [0, 255], green: [0, 255], blue: [0, 255], alpha: [0.0, 1.0])';
	}
	this.red = red;
	this.green = green;
	this.blue = blue;
	this.alpha = alpha;
}

function redRGBA(rgba) {
	return rgba.match(RGBA_RE)[1];
}

function greenRGBA(rgba) {
	return rgba.match(RGBA_RE)[2];
}

function blueRGBA(rgba) {
	return rgba.match(RGBA_RE)[3];
}

function alphaRGBA(rgba) {
	return rgba.match(RGBA_RE)[4];
}

function randomRGBA(alpha) {
	alpha = typeof alpha !== 'undefined' ? alpha : 1.0;

	return 'rgba(' + Math.ceil(Math.random() * 255) + ', '
		+ Math.ceil(Math.random() * 255) + ', '
		+ Math.ceil(Math.random() * 255) + ', '
		+ alpha + ')';
}

function adjustAlpha(rgba, alpha) {
	var red = redRGBA(rgba);
	var green = greenRGBA(rgba);
	var blue = blueRGBA(rgba);
	var alpha = alphaRGBA(rgba);


}

function randomRGB() {
	return '#' + ('000000' + Math.ceil(Math.random() * 0xffffff).toString(16)).slice(-6);
}

function randomRGBNumber() {
	return Math.ceil(Math.random() * 0xffffff);
}

function complimentaryRGB(RGB) {
	return '#' + ('000000' + (0xffffff - parseInt(RGB.substring(1), 16)).toString(16)).slice(-6);
}

function fadeToRGBNumber(current, target, rate) {
	var currR = (0xff0000 & current) >> 16;
	var currG = (0x00ff00 & current) >> 8;
	var currB = (0x0000ff & current);

	var targR = (0xff0000 & target) >> 16;
	var targG = (0x00ff00 & target) >> 8;
	var targB = (0x0000ff & target);

	if (currR < targR) {
		if (targR - currR >= rate) {
			currR += rate;
		} else {
			currR++;
		}
	} else if (currR > targR) {
		if (currR - targR >= rate) {
			currR -= rate;
		} else {
			currR--;
		}
	}

	if (currG < targG) {
		if (targG - currG >= rate) {
			currG += rate;
		} else {
			currG++;
		}
	} else if (currG > targG) {
		if (currG - targG >= rate) {
			currG -= rate;
		} else {
			currG--;
		}
	}

	if (currB < targB) {
		if (targB - currB >= rate) {
			currB += rate;
		} else {
			currB++;
		}
	} else if (currB > targB) {
		if (currB - targB >= rate) {
			currB -= rate;
		} else {
			currB--;
		}
	}

	return currR << 16 | currG << 8 | currB;
}

function fadeToRGB(current, target, rate) {
	var currR = parseInt(current.substring(1, 3), 16);
	var currG = parseInt(current.substring(3, 5), 16);
	var currB = parseInt(current.substring(5, 7), 16);

	var targR = parseInt(target.substring(1, 3), 16);
	var targG = parseInt(target.substring(3, 5), 16);
	var targB = parseInt(target.substring(5, 7), 16);

	if (currR < targR) {
		if (targR - currR >= rate) {
			currR += rate;
		} else {
			currR++;
		}
	} else if (currR > targR) {
		if (currR - targR >= rate) {
			currR -= rate;
		} else {
			currR--;
		}
	}

	if (currG < targG) {
		if (targG - currG >= rate) {
			currG += rate;
		} else {
			currG++;
		}
	} else if (currG > targG) {
		if (currG - targG >= rate) {
			currG -= rate;
		} else {
			currG--;
		}
	}

	if (currB < targB) {
		if (targB - currB >= rate) {
			currB += rate;
		} else {
			currB++;
		}
	} else if (currB > targB) {
		if (currB - targB >= rate) {
			currB -= rate;
		} else {
			currB--;
		}
	}

	return '#'
		+ ('0' + currR.toString(16)).slice(-2)
		+ ('0' + currG.toString(16)).slice(-2)
		+ ('0' + currB.toString(16)).slice(-2);
}

function fadeToRGBA(current, target, rate) {
	var currR = parseInt(redRGBA(current));
	var currG = parseInt(greenRGBA(current));
	var currB = parseInt(blueRGBA(current));
	var currA = alphaRGBA(current);

	var targR = parseInt(redRGBA(target));
	var targG = parseInt(greenRGBA(target));
	var targB = parseInt(blueRGBA(target));

	if (currR < targR) {
		if (targR - currR >= rate) {
			currR += rate;
		} else {
			currR++;
		}
	} else if (currR > targR) {
		if (currR - targR >= rate) {
			currR -= rate;
		} else {
			currR--;
		}
	}

	if (currG < targG) {
		if (targG - currG >= rate) {
			currG += rate;
		} else {
			currG++;
		}
	} else if (currG > targG) {
		if (currG - targG >= rate) {
			currG -= rate;
		} else {
			currG--;
		}
	}

	if (currB < targB) {
		if (targB - currB >= rate) {
			currB += rate;
		} else {
			currB++;
		}
	} else if (currB > targB) {
		if (currB - targB >= rate) {
			currB -= rate;
		} else {
			currB--;
		}
	}

	return 'rgba(' + currR + ', ' + currG + ', ' + currB + ', ' + currA + ')';
}

function toRGBA(RGB, alpha) {
	return 'rgba(' + parseInt(RGB.substring(1, 3), 16) + ', ' +
		parseInt(RGB.substring(3, 5), 16) + ', ' +
		parseInt(RGB.substring(5, 7), 16) + ', ' + alpha + ')';
}

function equalsRGBAnoAlpha(left, right) {
	if (redRGBA(left) === redRGBA(right) &&
		greenRGBA(left) === greenRGBA(right) &&
		blueRGBA(left) === blueRGBA(right)) {
		return true;
	} else {
		return false;
	}
}