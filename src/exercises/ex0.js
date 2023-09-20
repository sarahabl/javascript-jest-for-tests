function fizz_buzz(numbers) {
    let result = []
    
    numbers.forEach(number => {
        if (number % 15 === 0) {
            result.push('fizzbuzz')
        } else if (number % 3 === 0) {
            result.push('fizz')
        } else if (number % 5 === 0) {
            result.push('buzz')
        } else {
            result.push(number)
        }
    });
        
    
    return result.join(', ')
}

module.exports = fizz_buzz;